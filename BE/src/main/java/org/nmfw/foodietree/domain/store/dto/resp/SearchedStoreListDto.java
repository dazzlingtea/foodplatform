package org.nmfw.foodietree.domain.store.dto.resp;

import lombok.*;
import org.nmfw.foodietree.domain.store.entity.Store;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter @Setter @ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SearchedStoreListDto {
    private String storeId;
    private String storeName;
    private String category;
    private String address;
    private Integer price;
    private String storeImg;
    private Integer productCnt;
    private Integer restCnt;
    private LocalTime openAt;
    private LocalTime closedAt;
    private String productImg;
    private Long productId;

    public static SearchedStoreListDto fromEntity(Store store) {
        return SearchedStoreListDto.builder()
                .storeId(store.getStoreId())
                .storeName(store.getStoreName())
                .category(store.getCategory().getFoodType())
                .address(store.getAddress())
                .price(store.getPrice())
                .storeImg(store.getStoreImg())
                .productCnt(store.getProductCnt())
                .openAt(store.getOpenAt())
                .closedAt(store.getClosedAt())
                .productImg(store.getProductImg())
                .build();
    }

    public static SearchedStoreListDto fromEntity(Store store, int cnt, Long productId) {
		SearchedStoreListDto storeListDto = fromEntity(store);
		storeListDto.setRestCnt(cnt);
        storeListDto.setProductId(productId);
		return storeListDto;
    }
}
