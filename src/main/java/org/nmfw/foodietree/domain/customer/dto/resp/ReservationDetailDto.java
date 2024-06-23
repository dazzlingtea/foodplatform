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
public class ReservationDetailDto {
    private String customerId;
    private String customerName;
    private String reservationTime;
    private String cancelReservationAt;
    private String storeName;
}
