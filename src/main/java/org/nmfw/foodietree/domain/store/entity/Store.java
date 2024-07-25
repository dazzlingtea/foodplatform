package org.nmfw.foodietree.domain.store.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.nmfw.foodietree.domain.product.entity.Product;
import org.nmfw.foodietree.domain.store.entity.value.ApproveStatus;
import org.nmfw.foodietree.domain.store.entity.value.StoreCategory;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@ToString(exclude = {"storeApprovals", "products"})
@EqualsAndHashCode(of = "storeId")
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name="tbl_store")
public class Store {

    @Id // auto increment
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idx_store_id", nullable = false)
    private Long idxStoreId;

    // 유니크
    @Column(name = "store_id", unique = true)
    private String storeId;

//    @Setter
//    private String password;

    @Enumerated(EnumType.STRING)
    private StoreCategory category;

    @Enumerated(EnumType.STRING)
    private ApproveStatus approve;

    private String address;

    private Integer warningCount;
    private Integer price;
    private Integer productCnt;
    private String storeContact;
    private String storeName;
    private String storeImage;
    private String storeLicenseNumber;

    private LocalDateTime openAt; // 가게 영업시작 시간
    private LocalDateTime closedAt; // 가게 영업종료 시간
    private LocalDateTime limitTime; // 자동로그인 유효시간

    @OneToMany(mappedBy = "store",
            fetch = FetchType.LAZY,
            orphanRemoval = true,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH}
    )
    private List<Product> products = new ArrayList<>();  // products 연관관계

    @OneToMany(mappedBy = "store",
            fetch = FetchType.LAZY,
            orphanRemoval = true,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH}
    )
    private List<StoreApproval> storeApprovals = new ArrayList<>(); //



    // storeApproval 양방향 삭제
    public void removeStoreApproval(StoreApproval storeApproval) {
        this.storeApprovals.remove(storeApproval);
        storeApproval.setStore(null);
    }
    // storeApproval 양방향 삽입
    public void addStoreApproval(StoreApproval storeApproval) {
        this.storeApprovals.add(storeApproval);
        storeApproval.setStore(this);
    }
    // 연관된 product 추가 메서드
    public void addProduct(Product product) {
        products.add(product);
        product.setStore(this);
    }

    // 연관된 product 제거 메서드
    public void removeProduct(Product product) {
        products.remove(product);
        product.setStore(null);
    }


}