import React from 'react';
import FoodNav from '../../components/mainPage/FoodNav';

import img1 from '../../assets/images/userMain/image1.jpg';
import img2 from '../../assets/images/userMain/image2.jpg';
import img3 from '../../assets/images/userMain/image3.jpg';


const MainPage = () => {
  // const categories = ["한식", "중식", "양식", "일식", "디저트", "기타"];

//   내가 찜한 가게 리스트 더미
  const stores = [
    { name: '공차', image: img1, price: 3900, discount: '55%'},
    { name: '김밥천국', image: img2, price: 3900  },
    { name: '메가커피', image: img3, price: 3900  },
    { name: 'Store 4', image: img1, price: 3900  },
    { name: 'Store 5', image: img2, price: 3900  },
    { name: 'Store 6', image: img3, price: 3900  },
  ]

  return (
    <>
      <div className="main-page">
        <FoodNav stores={stores}/>
      </div>
    </>
  );
}

export default MainPage;
