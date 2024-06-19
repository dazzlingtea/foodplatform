package org.nmfw.foodietree.domain.store.entity;

import lombok.*;
import java.time.LocalDateTime;
import org.nmfw.foodietree.domain.store.entity.value.StoreApproveStatus;
import org.nmfw.foodietree.domain.store.entity.value.StoreCategory;

@Getter @ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
public class Store {

    private String storeId;
    @Setter
    private String password;
    private StoreCategory category;
    private String address;
    private StoreApproveStatus approve;
    private int warningCount;
    private int price;
    private String businessNumber;
    private String storeImage;
}
