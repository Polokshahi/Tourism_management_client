import React from 'react';
import PopularDestinations from '../PopularDestinations/PopularDestinations';
import WhyChooseUs from './WhyChooseUs/WhyChooesUs';
import Banner from './Banner/Banner';
import OverviewSection from './OverviewSection/OverviewSection';
import WhyPeopleLove from './WhyPeopleLove/WhyPeopleLove';

import TourTabs from './TourTabs/TourTabs';
import TouristStoriesSection from './TouristStoriesSection/TouristStoriesSection';
import BlogSection from './BlogSection/BlogSection';

const Home = () => {
    return (
        <div className='mb-5 mt-15 space-y-14'>
            <Banner></Banner>
            <OverviewSection></OverviewSection>
            <TourTabs></TourTabs>
            <TouristStoriesSection></TouristStoriesSection>
            <WhyPeopleLove></WhyPeopleLove>
            <BlogSection></BlogSection>
            <PopularDestinations></PopularDestinations>
            <WhyChooseUs></WhyChooseUs>
        </div> 
    );
};

export default Home;