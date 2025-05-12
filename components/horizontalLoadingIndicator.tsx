import { colorsRGB } from '@/constants';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

interface MovingLoadingBarProps {
    className?: string;
}

const MovingLoadingBar = ({ className }: MovingLoadingBarProps) => {
    const [dimention, setDimention] = useState(0)
    return (
        <ProgressBar
            width={dimention}
            className='basis-full mb-5'
            indeterminate={true}
            indeterminateAnimationDuration={1250}
            unfilledColor={colorsRGB.secondary}
            color={colorsRGB.black}
            borderColor={colorsRGB.light_gray}
            borderWidth={0}
            height={10}
        />
    );
};

export default MovingLoadingBar;