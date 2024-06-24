//package org.nmfw.foodietree.domain.store.repository;
//
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.nmfw.foodietree.domain.store.entity.Store;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.transaction.annotation.Transactional;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//@Transactional
//class StoreRepositoryTest {
//    @Autowired
//    StoreMapper repo;
//
//    @BeforeEach
//    void setUp() {
//        repo.save(
//                Store.builder()
//                .storeId("test")
//                .password("test")
//                .category("test")
//                .address("test")
//                .approve("test")
//                .warningCount(0)
//                .price(0)
//                .businessNumber("test")
//                .build()
//        );
//    }
//
//    @Test
//    void save() {
//        assertTrue(repo.save(
//                Store.builder()
//                .storeId("test2")
//                .password("test")
//                .category("test")
//                .address("test")
//                .approve("test")
//                .warningCount(0)
//                .price(0)
//                .businessNumber("test")
//                .build()
//        ));
//    }
//}