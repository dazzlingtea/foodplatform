package org.nmfw.foodietree.domain.customer.entity;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Customer {
    private String customerId;
    private String customerPassword;
    private String nickname;
    private String customerPhoneNumber;
    private String profileImage;
}
