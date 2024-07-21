package org.nmfw.foodietree.domain.store.entity;

import lombok.*;
import org.hibernate.annotations.GenericGenerator;
import org.nmfw.foodietree.domain.store.entity.value.StoreApproveStatus;
import org.nmfw.foodietree.domain.store.entity.value.StoreCategory;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter @Setter
@ToString(exclude = "storeApprovals")
@EqualsAndHashCode(of = "storeId")
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name="tbl_store")
public class Store {

    @Id
    @GenericGenerator(strategy = "uuid2", name = "uuid-generator")
    @GeneratedValue(generator = "uuid-generator")
    @Column(name = "store_id")
    private String storeId;
    @Setter
    private String password;
    private String category;
    private String address;
    private StoreApproveStatus approve;
    private int warningCount;
    private int price;
    private int productCnt;
    private String businessNumber;
    private String storeName;
    private String storeImage;
    private String storeLicenseNumber;

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