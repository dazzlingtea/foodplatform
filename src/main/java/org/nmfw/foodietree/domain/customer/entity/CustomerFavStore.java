package org.nmfw.foodietree.domain.customer.entity;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerFavStore {
    private int id;
    private String customerId;
    private String storeId;
}
