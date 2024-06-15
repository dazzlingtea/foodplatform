package org.nmfw.foodietree.domain.store.entity;

import lombok.*;

@Getter @ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Store {
    private String storeId;
    private String password;
    private String category;
    private String address;
    private String approve;
    private int warningCount;
    private int price;
    private String businessNumber;
}
