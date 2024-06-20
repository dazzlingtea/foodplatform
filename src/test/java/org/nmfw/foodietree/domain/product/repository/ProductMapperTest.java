package org.nmfw.foodietree.domain.product.repository;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.nmfw.foodietree.domain.product.dto.response.ProductFindAllDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ProductMapperTest {

    private static final Logger log = LoggerFactory.getLogger(ProductMapperTest.class);
    @Autowired
    ProductMapper productMapper;


    @Test
    @DisplayName("")
    void findAllTest(){
        List<ProductFindAllDto> all = productMapper.findAll();

        System.out.println("all = " + all);

    }

}