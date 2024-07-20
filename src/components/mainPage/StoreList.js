// import React, { useRef, useEffect } from "react";
// import styles from "./StoreList.module.scss";
// import { register } from "swiper/element/bundle";

// register();

// const StoreList = ({ stores }) => {
//   const swiperElRef = useRef(null);

//   useEffect(() => {
//     swiperElRef.current.addEventListener("swiperprogress", (e) => {
//       const [swiper, progress] = e.detail;
//       console.log(progress);
//     });

//     swiperElRef.current.addEventListener("swiperslidechange", (e) => {
//       console.log("slide changed");
//     });
//   }, []);

//   return (
//     <>
//       <div className={styles.list1}>
//         <h2 className={styles.title1}>❤️ 내가 찜한 가게</h2>
//         <div className={styles["favorite-store-list"]}>
//           <swiper-container
//             ref={swiperElRef}
//             slides-per-view="4"
//             navigation="true"
//             pagination="true"
//           >
//             {stores.map((store, index) => (
//               <swiper-slide key={index}>
//                 <div className={styles.storeItem}>
//                   <img src={store.image} alt={store.name} />
//                   <p className={styles.storeName}>{store.name}</p>
//                   <p className={styles.storePrice}>{store.price}</p>
//                 </div>
//               </swiper-slide>
//             ))}
//           </swiper-container>
//         </div>
//       </div>
//     </>
//   );
// };

// export default StoreList;
