"use client"

import React, { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import styles from './pageslider.module.css';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Link from 'next/link';
import ShowInputform from '@/app/[word]/components/(pageslider)/(pageslidercomponent)/(Inputform)/ShowInputform';
import Inputandsaveshow from '../(Inputandsave)/Inputandsaveshow';
import data from '../../../../../public/data.json'
import Quesitons from '../{questions)/questions';
import { usePathname } from 'next/navigation';

const Pageslider: React.FC = () => {
    const [word, setWord] = useState<string>("");
    const pathname = usePathname();

    const handleSearch = async () => {
        const path = pathname.split('/')
        setWord(decodeURI(path[1]));
    };

    useEffect(() => {
      handleSearch();
    }, []);
    
    const [currentslide, setcurrentslide] = useState<number>(0);
    const sliderRef = useRef<Slider | null>(null);  // Slider 타입 명시

    const settings = {
        infinite: false,
        arrows: false,
        dots:false,
        slidesToShow:1,
        speed: 1000,
        afterChange: (current: number) => setcurrentslide(current)  // 명시적 타입 정의
    };

    const goToSlide = (slideIndex: number) => {
        if (sliderRef && sliderRef.current) {
            sliderRef.current.slickGoTo(slideIndex);
        }
    };

    return(
        <>
        <div className={styles.pagesliderWrapper}>
            <div className="bar-navigation">
              {['8Sights', '질문 만들기', '질문목록'].map((bar, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`${styles.barNavigationButton} ${currentslide === index ? styles.barNavigationButtonActive : styles.barNavigationButtonInactive}`}
                >
                  {bar}
                </button>
              ))}
            </div>
            <Slider {...settings} ref={sliderRef}>
                <div>
                  <div className={styles.padding}>
                  <div className={styles.maxwidth}>
                  <h2>&nbsp;8 관점</h2>
                  <p>&nbsp;제시된 8 관점을 통해 {word}에 대해 탐구해 보아요. </p>
                   
                  <div className={styles.flexContainer}>
                    <Link href={`${word}/인문학`} className={styles.textdeconone}>
                      <form className={`${styles.clickbox} ${styles.liberalarts}`}>인문학</form>
                    </Link>
                    <Link href={`${word}/교육학`} className={styles.textdeconone}>
                      <form className={`${styles.clickbox} ${styles.education}`}>교육학</form>
                    </Link>
                    <Link href={`${word}/사회과학`} className={styles.textdeconone}>
                      <form className={`${styles.clickbox} ${styles.socience}`}>사회과학</form>
                    </Link>

                  </div>
                  <div className={styles.flexContainer}>
                    <Link href={`${word}/자연과학`} className={styles.textdeconone}>
                      <form className={`${styles.clickbox} ${styles.naturescience}`}>자연과학</form>
                    </Link>
                    <Link href={`${word}/`} className={styles.textdeconone}>
                      <form className={`${styles.clickbox} ${styles.centerlogo}`}></form> {/* someOtherClass 는 임의로 설정한 클래스명입니다. 실제로 필요한 클래스명으로 교체해야 합니다. */}
                    </Link>
                    <Link href={`${word}/공학`} className={styles.textdeconone}>
                      <form className={`${styles.clickbox} ${styles.mechanics}`}>공학</form>
                    </Link>
                  </div>
                  <div className={styles.flexContainer}>
                    <Link href={`${word}/의약학`} className={styles.textdeconone}>
                      <form className={`${styles.clickbox} ${styles.medicine}`}>의약학</form>
                    </Link>
                    <Link href={`${word}/예술체육학`} className={styles.textdeconone}>
                      <form className={`${styles.clickbox} ${styles.artPhysical}`}>예술<br/>체육학</form>
                    </Link>
                    <Link href={`${word}/농수해양학`} className={styles.textdeconone}>
                      <form className={`${styles.clickbox} ${styles.agricultureOcean}`}>농수<br/>해양학</form>
                    </Link>
                  </div>
                </div>  
                </div>
              </div>
              <div>
                <div className={styles.padding}>
                  <div className={styles.maxwidth}>
                  <h2>나의 융합 질문</h2>
                  <p>8가지 분야의 글을 읽으면서 가지게 된 호기심을 바탕으로 나만의 학문융합 질문을 적어보세요. 혼자 만들기 어렵다면 아래의 가이드라인을 참고하여 보세요.</p>
                  <h4>01 키워드와 관련된 나의 경험을 떠올려보세요.</h4>
                  <hr/>
                  <h4>02 키워드와 관련한 현상 또는 문제상황을 떠올려보세요.</h4>
                  <hr/>
                  <h4>03 어떤 학문 분야들을 연결지을지 생각해보세요.</h4>
                  <hr/>
                  <h4>04 자신이 생각한 질문을 적어주세요.</h4>
                  <Inputandsaveshow></Inputandsaveshow>
                  <br />
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.padding}>
                <div className={styles.maxwidth}>
                <h2>Big Questions for {word}</h2>
                <p>2개 이상의 학문을 융합하여 선정한 키워드에 대한 질문을 만들어 보세요! 만든 질문에 대한 가능한 답변을 GPT로 생성해드립니다. </p>
                <br/>
                  
                    <Quesitons></Quesitons>
                    <p className={styles.smalltext}>위의 질문들을 보면서 나만의 최종 융합질문을 적어봅시다.</p>
                    <ShowInputform></ShowInputform>
                 
                
                </div>
                </div>
              </div>
            </Slider>
          </div>
        </>
      );
    };
    
    export default Pageslider;


