package org.nmfw.foodietree.domain.product.entity;

import lombok.*;

import java.time.LocalDateTime;

@Getter @ToString
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Product {
    private String productId;
    private String storeId;
    private LocalDateTime pickupTime;
    private LocalDateTime productUploadDate;
    private String proImage;

}
