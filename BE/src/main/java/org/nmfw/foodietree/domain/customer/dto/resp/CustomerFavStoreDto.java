package org.nmfw.foodietree.domain.customer.dto.resp;

import lombok.*;
import lombok.extern.slf4j.Slf4j;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@Builder
public class CustomerFavStoreDto {
    private String customerId;
    private String storeId;
    private String storeName;
    private String storeImg;
}
