package org.nmfw.foodietree.domain.store.entity;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.UpdateTimestamp;
import org.nmfw.foodietree.domain.store.entity.value.ApproveStatus;

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
    @GenericGenerator(strategy = "uuid2", name = "uuid-generator")
    @GeneratedValue(generator = "uuid-generator")
    @Column(name="store_approval_id")
    private String id; // 가게 등록 요청 랜덤문자 PK

    @Column(name="store_approval_license")
    private String license; // 가게 사업자등록번호

    @Column(name="store_approval_name")
    private String name; // 가게 상호명

    @Column(name="store_approval_address")
    private String address; // 가게 주소

    @Column(name = "store_approval_contact")
    private String contact; // 가게 연락처

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, name = "store_approval_status")
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
