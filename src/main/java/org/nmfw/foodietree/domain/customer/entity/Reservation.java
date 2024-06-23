package org.nmfw.foodietree.domain.customer.entity;

import lombok.*;

@Getter @Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Reservation {
    private String reservationId;
    private String customerId;
    private String productId;
    private String reservationTime;
    private String cancelReservationAt;
}
