package org.nmfw.foodietree.domain.customer.entity.value;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public enum PreferredFoodCategory {
    //    한식, 양식, 카페, 일식, 디저트, 중식, 기타
    KOREAN("한식"),
    WESTERN("양식"),
    CAFE("카페"),
    JAPANESE("일식"),
    DESSERT("디저트"),
    CHINESE("중식"),
    ELSE("기타");

    private final String koreanName;

    PreferredFoodCategory(String koreanName) {
        this.koreanName = koreanName;
    }

    public static PreferredFoodCategory fromKoreanName(String koreanName) {
        for (PreferredFoodCategory category : values()) {
            if (category.getKoreanName().equals(koreanName)) {
                return category;
            }
        }
        throw new IllegalArgumentException("Unknown korean name: " + koreanName);
    }
}