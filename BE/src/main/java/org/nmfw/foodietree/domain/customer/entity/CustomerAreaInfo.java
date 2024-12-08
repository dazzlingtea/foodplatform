package org.nmfw.foodietree.domain.customer.entity;

import lombok.*;

@Getter @Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerAreaInfo {
    private int id;
    private String customerId;
    private String preferredArea;
}
