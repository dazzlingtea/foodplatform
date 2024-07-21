package org.nmfw.foodietree.domain.product.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.nmfw.foodietree.domain.store.entity.Store;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@ToString
@EqualsAndHashCode(of = "productId")
@AllArgsConstructor
@NoArgsConstructor
@Builder

@Entity
@Table(name="tbl_product")
public class Product {

    @Id
    @GenericGenerator(strategy = "uuid2", name = "uuid-generator")
    @GeneratedValue(generator = "uuid-generator")
    private String productId;

    private LocalDateTime pickupTime;
    private LocalDateTime productUploadDate; // 요청 처리된 시간인지, 요청 시간인지?

    private int price;
    private int productCnt;
    private String proImage;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

//    private String storeImg;
//    private String storeName;
//    private String category;
//    private String address;
//    private List<String> preferredArea;
//    private List<String> preferredFood;

}
