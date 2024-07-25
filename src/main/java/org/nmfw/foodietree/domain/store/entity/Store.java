package org.nmfw.foodietree.domain.store.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.nmfw.foodietree.domain.product.entity.Product;
import org.nmfw.foodietree.domain.store.entity.value.ApproveStatus;

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

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idxStoreId;

    // 유니크
    @Column(name = "store_id", unique = true)
    private String storeId;
//    @Setter
//    private String password;
    private String category;
    private String address;
    private ApproveStatus approve;
    private int warningCount;
    private int price;
    private int productCnt;
    private String businessNumber;
    private String storeName;
    private String storeImage;
    private String storeLicenseNumber;

    @Temporal(TemporalType.TIME)
    private LocalDateTime openAt; // 가게 영업시작 시간
    @Temporal(TemporalType.TIME)
    private LocalDateTime closedAt; // 가게 영업종료 시간
    private LocalDateTime limitTime; // 자동로그인 유효시간

    @OneToMany(mappedBy = "store",
            fetch = FetchType.LAZY,
            orphanRemoval = true,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH}
    )
    private List<Product> products = new ArrayList<>();

    @OneToMany(mappedBy = "store",
            fetch = FetchType.LAZY,
            orphanRemoval = true,
            cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REFRESH, CascadeType.DETACH}
    )
    private List<StoreApproval> storeApprovals = new ArrayList<>();

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


}