package org.nmfw.foodietree.domain.auth.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Setter
@Getter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class EmailCodeStoreDto {
    private String storeId;
    private String userType;
    @Setter
    private LocalDateTime refreshTokenExpireDate;
}