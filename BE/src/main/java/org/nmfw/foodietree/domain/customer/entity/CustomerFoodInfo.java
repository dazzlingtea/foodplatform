package org.nmfw.foodietree.domain.customer.entity;

import lombok.*;

@Getter @Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerFoodInfo {
    private int id;
    private String customerId;
    private String preferredFood;
}
