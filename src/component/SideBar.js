import styled from "styled-components";
import { useState, memo, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { GeneralBlock, ErrorBlock } from "./Blocks";
import { getTopPosts } from "../WebAPI";
import { blue, earth, white } from "../utils/colors";
import {
  MEDIA_QUERY_XL,
  MEDIA_QUERY_LG,
  MEDIA_QUERY_MD,
  MEDIA_QUERY_SM,
} from "../utils/breakpoints";
import HamburgerButton from "../component/HamburgerButton";
import Loading from "../component/Loading";

const Wrapper = styled.div``;

const SideBarContainer = styled.div`
  width: 16vw;
  margin-right: 5vw;
  box-sizing: border-box;

  ${MEDIA_QUERY_XL} {
    margin-right: 4vw;
    width: 17vw;
  }

  ${MEDIA_QUERY_LG} {
    position: absolute;
    top: 4px;
    left: 0;
    box-sizing: content-box;
    padding: 90px 40px 0px 40px;
    border-radius: 5px;
    width: 270px;
    background: ${white.swan};
    border: 1px solid rgba(60, 63, 78, 0.1);
    margin-left: -350px;
    transition: all 1s;
    z-index: 3;
    max-height: 100%;
    overflow-y: scroll;

    ${(props) =>
      props.$showSideBar &&
      `
      margin: 0;
      
    `}
  }

  ${MEDIA_QUERY_MD} {
    position: absolute;
    top: 4px;
    left: 0;
    box-sizing: content-box;
    padding: 90px 40px 0px 40px;
    border-radius: 5px;
    width: 200px;
    background: ${white.swan};
    border: 1px solid rgba(60, 63, 78, 0.1);
    margin-left: -280px;
    transition: all 1s;

    ${(props) =>
      props.$showSideBar &&
      `
      margin: 0;
      
    `}
  }

  ${MEDIA_QUERY_SM} {
    position: absolute;
    top: 4px;
    left: 0;
    box-sizing: content-box;
    padding: 90px 20px 0px 20px;
    border-radius: 5px;
    width: 200px;
    background: ${white.swan};
    border: 1px solid rgba(60, 63, 78, 0.1);
    margin-left: -240px;
    transition: all 1s;

    ${(props) =>
      props.$showSideBar &&
      `
      margin: 0;
      
    `}
  }
`;

const ClassificationContainer = styled.div`
  height: 300px;
  width: 100%;
  margin-bottom: 60px;
  text-align: center;
  box-sizing: border-box;
`;

const ClassificationContent = styled.div`
  padding: 10px 2%;
`;

const Classification = styled.div`
  font-size: 16px;
  font-weight: bold;
  height: 45px;
  line-height: 50px;
  margin-bottom: 15px;
  cursor: pointer;
  color: ${blue.darkest};

  :hover {
    color: ${earth.honey};
  }

  ${(props) =>
    props.$active &&
    `
    color: ${earth.honey};
  `}
`;

const NavListContainer = styled(ClassificationContainer)`
  height: 520px;
`;

const NavListContent = styled(ClassificationContent)`
  display: flex;
  flex-direction: column;
`;

const Nav = styled(Classification)`
  text-decoration: none;
`;

const RecentPosts = styled.div`
  width: 100%;
  margin-bottom: 15vh;
`;

const RecentPostContent = styled.div`
  padding: 15px 1% 10px 1%;
  display: flex;
  flex-direction: column;
`;

const RecentPost = styled(Link)`
  height: 50px;
  margin-bottom: 35px;
  overflow: scroll;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  text-decoration: none;
  color: ${blue.darkest};

  :hover {
    color: ${earth.honey};
  }

  ${MEDIA_QUERY_XL} {
    font-size: 14px;
  }

  ${MEDIA_QUERY_LG} {
    font-size: 16px;
  }

  ${MEDIA_QUERY_MD} {
    font-size: 14px;
  }
`;

const HamburgerButtonContainer = styled.div`
  display: none;
  position: absolute;
  top: 20px;
  left: 40px;
  z-index: 4;

  ${MEDIA_QUERY_LG} {
    display: flex;
  }

  ${MEDIA_QUERY_SM} {
    display: flex;
    left: 20px;
  }
`;

function SideBar({ changeFilter }) {
  const [latestPosts, setLatestPosts] = useState([]);
  const [error, setError] = useState(false);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [showSideBar, setShowSideBar] = useState(false);

  useEffect(() => {
    getTopPosts("createdAt")
      .then((data) => {
        setLatestPosts(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(true);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setShowSideBar(false);
  }, [location.pathname]);

  const handleClassificationChange = useCallback((classification) => {
    changeFilter.setFilter(classification);
    setShowSideBar(false);
  }, []);

  return (
    <Wrapper>
      <HamburgerButtonContainer>
        <HamburgerButton
          isExpended={showSideBar}
          setIsExpended={setShowSideBar}
        />
      </HamburgerButtonContainer>
      <SideBarContainer $showSideBar={showSideBar}>
        {(location.pathname === "/Posts/Research" ||
          location.pathname === "/Posts/Analysis") && (
          <ClassificationContainer>
            <GeneralBlock
              title={`${
                location.pathname === "/Posts/Research"
                  ? "????????????"
                  : "????????????"
              }??????`}
              postBackgroundColor="rgba(226, 217, 195, 0.7)"
              titleBackgroundColor="rgba(255, 255, 255, 0.6)"
              size="small"
            >
              <ClassificationContent>
                <Classification
                  $active={changeFilter.filter === "FinTech"}
                  onClick={() => handleClassificationChange("FinTech")}
                >
                  ????????????
                </Classification>
                <Classification
                  $active={changeFilter.filter === "General"}
                  onClick={() => handleClassificationChange("General")}
                >
                  ????????????
                </Classification>
                <Classification
                  $active={!changeFilter.filter}
                  onClick={() => handleClassificationChange(null)}
                >
                  ????????????
                </Classification>
              </ClassificationContent>
            </GeneralBlock>
          </ClassificationContainer>
        )}
        {location.pathname === "/Forums" && (
          <ClassificationContainer>
            <GeneralBlock
              title="??????????????????"
              postBackgroundColor="rgba(226, 217, 195, 0.7)"
              titleBackgroundColor="rgba(255, 255, 255, 0.6)"
              size="small"
            >
              <ClassificationContent>
                <Classification
                  $active={changeFilter.filter === "PhD"}
                  onClick={() => handleClassificationChange("PhD")}
                >
                  ???????????????
                </Classification>
                <Classification
                  $active={changeFilter.filter === "News"}
                  onClick={() => handleClassificationChange("News")}
                >
                  ????????????
                </Classification>
                <Classification
                  $active={!changeFilter.filter}
                  onClick={() => handleClassificationChange(null)}
                >
                  ????????????
                </Classification>
              </ClassificationContent>
            </GeneralBlock>
          </ClassificationContainer>
        )}
        {location.pathname !== "/Forums" &&
          location.pathname !== "/Posts/Research" &&
          location.pathname !== "/Posts/Analysis" && (
            <NavListContainer>
              <GeneralBlock
                title="????????????"
                postBackgroundColor="rgba(226, 217, 195, 0.7)"
                titleBackgroundColor="rgba(255, 255, 255, 0.6)"
                size="small"
              >
                <NavListContent>
                  <Nav as={Link} to="/">
                    ??????
                  </Nav>
                  <Nav as={Link} to="/Posts/Research">
                    ????????????
                  </Nav>
                  <Nav as={Link} to="/Posts/Analysis">
                    ????????????
                  </Nav>
                  <Nav as={Link} to="/Forums">
                    ????????????
                  </Nav>
                  <Nav as={Link} to="/SpecialThanks">
                    ????????????
                  </Nav>
                </NavListContent>
              </GeneralBlock>
            </NavListContainer>
          )}
        <RecentPosts>
          {error && (
            <ErrorBlock size="small" backgroundColor="rgba(226, 217, 195, 0.7)">
              ??????????????????????????????
            </ErrorBlock>
          )}
          {!error && (
            <GeneralBlock
              title="????????????"
              postBackgroundColor="rgba(226, 217, 195, 0.7)"
              titleBackgroundColor="rgba(255, 255, 255, 0.6)"
              size="small"
            >
              {isLoading && <Loading size="small">Loading...</Loading>}
              {!isLoading && latestPosts && (
                <RecentPostContent>
                  {latestPosts.map((post) => {
                    const category =
                      post.category === "Forum" ? "Forum" : "Post";
                    return (
                      <RecentPost key={post.id} to={`/${category}/${post.id}`}>
                        {post.title}
                      </RecentPost>
                    );
                  })}
                </RecentPostContent>
              )}
            </GeneralBlock>
          )}
        </RecentPosts>
      </SideBarContainer>
    </Wrapper>
  );
}

export default memo(SideBar);
