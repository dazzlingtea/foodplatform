package org.nmfw.foodietree.domain.customer.entity;

import lombok.*;

@Getter
@Setter
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReservationDetail {
    //tbl_reservation
    private String customerId;
    private String productId;
    private String reservationTime;
    private String cancelReservationAt;
    private String pickedUpAt;
    // tbl_product
    private String storeId;
    private String pickupTime;
    // tbl_store
    private String storeName;
    private String category;
    private String address;
    private String price;
    private String storeImg;
    //tbl_customer
    private String nickname;
}
