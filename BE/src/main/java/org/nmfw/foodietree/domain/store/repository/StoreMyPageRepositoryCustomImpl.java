package org.nmfw.foodietree.domain.store.repository;

import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.Projections;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.extern.slf4j.Slf4j;
import org.nmfw.foodietree.domain.product.dto.response.ProductInfoDto;
import org.nmfw.foodietree.domain.product.entity.QProduct;
import org.nmfw.foodietree.domain.reservation.entity.QReservation;
import org.nmfw.foodietree.domain.store.dto.resp.*;
import org.nmfw.foodietree.domain.store.entity.QStore;
import org.nmfw.foodietree.domain.store.entity.Store;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;


@Repository
@Slf4j
public class StoreMyPageRepositoryCustomImpl implements StoreMyPageRepositoryCustom {

    private final JPAQueryFactory factory;
    private StoreHolidaysRepository storeHolidaysRepository;

    @Autowired
    public StoreMyPageRepositoryCustomImpl(EntityManager em) {
        this.factory = new JPAQueryFactory(em);
    }

    @Override
    public StoreMyPageDto getStoreMyPageInfo(String storeId) {
//        QStore qStore = QStore.store;
//        return factory.select(Projections.constructor(StoreMyPageDto.class,
//                        qStore.storeId,
//                        qStore.storeName,
//                        qStore.address,
//                        qStore.storeImg,
////                        qStore.category,
////                        qStore.approve,
//                        qStore.category.stringValue().as("category"),  // category를 문자열로 변환
//                        qStore.approve.stringValue().as("approve"),   // approve를 문자열로 변환
//                        qStore.price,
//                        qStore.productCnt,
//                        qStore.openAt,
//                        qStore.closedAt
//                       ))
//                .from(qStore)
//                .where(qStore.storeId.eq(storeId))
//                .fetchOne();
//
        QStore qStore = QStore.store;
        Store storeEntity = factory.selectFrom(qStore)
                .where(qStore.storeId.eq(storeId))
                .fetchOne();

        if (storeEntity == null) {
            return null; // 엔티티가 없으면 null을 반환하거나 예외를 던질 수 있습니다.
        }
        return StoreMyPageDto.builder()
                .storeId(storeEntity.getStoreId())
                .storeName(storeEntity.getStoreName())
                .storeImg(storeEntity.getStoreImg())
                .category(storeEntity.getCategory().toString())
                .address(storeEntity.getAddress())
                .approve(storeEntity.getApprove().toString())
                .price(storeEntity.getPrice())
                .productCnt(storeEntity.getProductCnt())
                .openAt(storeEntity.getOpenAt())
                .closedAt(storeEntity.getClosedAt())
                .storeContact(storeEntity.getStoreContact())
                .build();

    }

    @Override
    public List<StoreMyPageCalendarModalDto> getStoreMyPageCalendarModalInfo(String storeId, String date) {
        QStore qStore = QStore.store;
        QProduct qProduct = QProduct.product;

        // String을 LocalDate로 변환
        LocalDate localDate = LocalDate.parse(date);

        // LocalDateTime으로 변환 (시작 시간은 00:00:00)
        LocalDateTime localDateTime = localDate.atStartOfDay();

        return factory.select(Projections.constructor(StoreMyPageCalendarModalDto.class,
                        qProduct.pickupTime,
                        qStore.openAt,
                        qStore.closedAt,
                        qStore.productCnt
                ))
                .from(qStore)
                .leftJoin(qProduct).on(qProduct.storeId.eq(qStore.storeId)
                        .and(qProduct.pickupTime.eq(localDateTime))
                )
                .where(qStore.storeId.eq(storeId))
                .fetch();
    }

    @Override
    public void updateProductAuto(String storeId, String pickupTime) {
        // productRepository 의 save 로 구현
    }

//    @Override
//    @Transactional
//    public void cancelProductByStore(String storeId, LocalDate pickupTime) {
//        // Implement cancelProductByStore using QueryDSL if needed
//    }

    @Override
    public List<StoreCheckDto> getAllStore() {
        QStore qStore = QStore.store;
        return factory.select(Projections.constructor(StoreCheckDto.class,
                        qStore.storeId,
                        qStore.storeName,
//                        qStore.pickupTime,
                        qStore.productCnt,
                        qStore.closedAt))
                .from(qStore)
                .fetch();
    }

    @Override
    public List<ProductInfoDto> getProductCntByDate(String storeId, String date) {
        QProduct qProduct = QProduct.product;
        QReservation qReservation = QReservation.reservation;

        // String으로 변환하여 날짜 비교
        StringTemplate formattedDate = Expressions.stringTemplate(
                "DATE_FORMAT({0}, {1})", qProduct.productUploadDate, ConstantImpl.create("%Y-%m-%d")
        );
        BooleanExpression dateCondition = formattedDate.eq(date);
        log.info("dateCondition = {}", dateCondition);
        return factory.select(Projections.constructor(ProductInfoDto.class,
                        qProduct.pickupTime,
                        qProduct.productUploadDate,
//                        qProduct.cancelByStore,
                        qReservation.reservationTime,
                        qReservation.cancelReservationAt,
                        qReservation.pickedUpAt))
                .from(qProduct)
                .leftJoin(qReservation).on(qProduct.productId.eq(qReservation.productId))
                .where(qProduct.storeId.eq(storeId).and(dateCondition))
                .fetch();
    }

//    @Override
//    public long countPickedUpProductsByDate(String storeId, LocalDate date) {
//        QProduct qProduct = QProduct.product;
//        QReservation qReservation = QReservation.reservation;
//
//        BooleanExpression condition = qProduct.store.storeId.eq(storeId)
//                .and(qReservation.pickedUpAt.dateEq(date));
//
//        return queryFactory.select(qProduct.count())
//                .from(qProduct)
//                .leftJoin(qReservation).on(qProduct.productId.eq(qReservation.productId))
//                .where(condition)
//                .fetchCount();
//    }
}
