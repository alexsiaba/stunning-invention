import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
// eslint-disable-next-line sort-imports
import Carousel from 'react-slick';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import imgAPI from '../../public/images/imgAPI';
import { withTranslation } from '../../i18n';
// eslint-disable-next-line sort-imports
import DotParallax from '../Parallax/Dots';
import Title from '../Title';
// eslint-disable-next-line sort-imports
import GeneralCard from '../Cards/General';
import useStyle from './project-style';

const projectData = [
  {
    img: imgAPI.architect[1],
    title: 'Vivamus sit amet',
    desc: 'Ut sed eros finibus, placerat orci id, dapibus mauris. Vestibulum consequat…',
  },
  {
    img: imgAPI.architect[2],
    title: 'Vivamus sit amet',
    desc: 'Ut sed eros finibus, placerat orci id, dapibus mauris. Vestibulum consequat…',
  },
  {
    img: imgAPI.architect[3],
    title: 'Vivamus sit amet',
    desc: 'Ut sed eros finibus, placerat orci id, dapibus mauris. Vestibulum consequat…',
  },
  {
    img: imgAPI.architect[1],
    title: 'Vivamus sit amet',
    desc: 'Ut sed eros finibus, placerat orci id, dapibus mauris. Vestibulum consequat…',
  },
  {
    img: imgAPI.architect[2],
    title: 'Vivamus sit amet',
    desc: 'Ut sed eros finibus, placerat orci id, dapibus mauris. Vestibulum consequat…',
  },
  {
    img: imgAPI.architect[3],
    title: 'Vivamus sit amet',
    desc: 'Ut sed eros finibus, placerat orci id, dapibus mauris. Vestibulum consequat…',
  },
];

function Project(props) {
  const slider = useRef(null);
  const { t } = props;

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const classes = useStyle();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: false,
    slidesToShow: 4,
    arrows: false,
    variableWidth: true,
    responsive: [{
      breakpoint: 1100,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    }],
  };

  useEffect(() => {
    if (theme.direction === 'rtl') {
      const lastSlide = Math.floor(projectData.length - 2);
      slider.current.slickGoTo(lastSlide);
    }
  }, []);

  return (
      <div className={classes.root}>
          <div className={classes.parallaxWrap}>
              <DotParallax />
          </div>

          <Container>
              <div className={classes.floatingTitle}>
                  <Title
                      desc={t('common:architect-landing.project_desc')}
                      head={t('common:architect-landing.project_title')}
                  />
              </div>
          </Container>

          <div className={classes.sliderWrap}>
              <div className={classes.carousel}>
                  <Carousel
                      ref={slider}
                      {...settings}
                  >
                      {isDesktop ? <div className={clsx(classes.props, classes.itemPropsFirst)}>
                          <div />
                      </div> : null}

                      {projectData.map((item, index) => (
                          <div
                              className={classes.item}
                              key={index.toString()}
                          >
                              <GeneralCard
                                  desc={item.desc}
                                  img={item.img}
                                  title={item.title}
                              />
                          </div>
                      ))}

                      {isDesktop ? <div className={clsx(classes.props, classes.itemPropsLast)}>
                          <div />
                      </div> : null}
                  </Carousel>
              </div>

              <IconButton
                  className={clsx(classes.nav, classes.prev)}
                  onClick={() => slider.current.slickPrev()}
              >
                  <i className="ion-ios-arrow-back" />
              </IconButton>

              <IconButton
                  className={clsx(classes.nav, classes.next)}
                  onClick={() => slider.current.slickNext()}
              >
                  <i className="ion-ios-arrow-forward" />
              </IconButton>
          </div>
      </div>
  );
}

Project.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation(['architect-landing'])(Project);
