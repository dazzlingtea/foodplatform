package org.nmfw.foodietree.domain.customer.entity;

import lombok.*;

import java.time.LocalDateTime;

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
    private LocalDateTime reservationTime;
    private LocalDateTime cancelReservationAt;
}
