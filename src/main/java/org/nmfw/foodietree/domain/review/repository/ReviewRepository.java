package org.nmfw.foodietree.domain.review.repository;
import org.nmfw.foodietree.domain.review.dto.res.ReviewDetailDto;

import org.nmfw.foodietree.domain.review.dto.res.MyReviewDto;
import org.nmfw.foodietree.domain.review.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.util.List;
import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long>, ReviewRepositoryCustom {

    boolean existByReservationId(Long reservationId);

    boolean existsByReservationId(Long reservationId);

    List<MyReviewDto> findEnableReviewsByCustomerId(String customerId);


}
