package org.nmfw.foodietree.domain.store.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;
import org.nmfw.foodietree.domain.store.entity.value.ApproveStatus;
import org.nmfw.foodietree.domain.store.entity.value.StoreCategory;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @Setter
@ToString(exclude = "store")
@EqualsAndHashCode(of="id")
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Entity
@Table(name="tbl_store_approval")
public class StoreApproval {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "store_approval_id", updatable = false)
    private String id; // 가게 등록 요청 랜덤문자 PK

    @Column(name="store_approval_license", nullable = false)
    private String license; // 가게 사업자등록번호

    @Column(name="store_approval_name", nullable = false)
    private String name; // 가게 상호명

    @Column(name="store_approval_address", nullable = false)
    private String address; // 가게 주소

    @Column(name = "store_approval_contact", nullable = false)
    private String contact; // 가게 연락처

    @Enumerated(EnumType.STRING)
    @Column(name = "store_approval_category", nullable = false)
    private StoreCategory category;

    @Enumerated(EnumType.STRING)
    @Column(name = "store_approval_status", nullable = false)
    @Builder.Default
    private ApproveStatus status = ApproveStatus.PENDING;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private Store store;

    // 양방향 수정
    public void changeStore(Store store) {
        this.store = store;
        store.getStoreApprovals().add(this);
    }


}
