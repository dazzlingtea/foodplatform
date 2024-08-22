import React from 'react';
import styles from "./Skeleton.module.scss";

const Skeleton = ({count, init= false}) => {
    return (
        <div className={`${styles.wrap} ${init ? styles.init : undefined}`}>
            <div className={styles.list}>
                {
                    Array.from(new Array(count)).map(
                        (_, index) => (
                            <div
                                className={styles.skeleton}
                                key={index}
                            >
                                <div className={styles.imageSkeleton}/>
                                <div className={styles.contentSkeleton}>
                                    <div className={styles.titleSkeleton}/>
                                    <div>
                                        <div className={styles.dateSkeleton}/>
                                        <div className={styles.countSkeleton}/>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
            <div className={styles.list}>
                {
                    Array.from(new Array(count)).map(
                        (_, index) => (
                            <div
                                className={styles.skeleton}
                                key={index}
                            >
                                <div className={styles.imageSkeleton}/>
                                <div className={styles.contentSkeleton}>
                                    <div className={styles.titleSkeleton}/>
                                    <div>
                                        <div className={styles.dateSkeleton}/>
                                        <div className={styles.countSkeleton}/>
                                    </div>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </div>
    );
};
Skeleton.displayName = 'Skeleton';
export default Skeleton;