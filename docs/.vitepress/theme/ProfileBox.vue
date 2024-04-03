<template>
  <div :class="$style['profile-box']">
    <div :class="$style['banner']">
      <img src="/imgs/banner.webp" />
      <div :class="$style['title']">
        <img :class="$style['avatar']" style="grid-area: a" src="/favicon.webp" alt="banner" />
        <p style="margin-left: 0.5rem; grid-area: b; font-weight: bold">守晨</p>
      </div>
    </div>
    <p :class="$style['bio']">
      💻不想上班的程序员 🍥Debian忠实粉 / INFP-A /
      MC，幻想郷，ACG爱好者，🎧音乐发烧友，🌸AI绘画小白，🐱想养猫 (或猫娘) /
      🍀日常，热爱分享，做自己喜欢的事。<a
        style="color: #51a8dd"
        href="https://miaobox.cc"
        target="_blank"
        >miaobox.cc</a
      >
      一个本地优先的实用工具箱
    </p>
    <div :class="$style['link-bar']">
      <!-- todo -->
    </div>
    <!-- <div :class="$style['info-bar']">
      <div :class="$style['info-item']">
        <p>12</p>
        <p>文档</p>
      </div>
      <div :class="$style['info-item']">
        <p>a</p>
        <p>2</p>
      </div>
      <div :class="$style['info-item']">
        <p>a</p>
        <p>2</p>
      </div>
    </div> -->
  </div>
</template>

<style module>
.profile-box {
  position: sticky;
  top: 0;
  /* max-width: 25%; */
  background-color: var(--color-bg-card);
  /* height: 100vh; */
  /* padding: 1rem; */
  border-radius: 0.5rem;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.23),
    0 1px 6px rgba(0, 0, 0, 0.16);
  overflow: hidden;
  z-index: 1100;
}

.profile-box .banner {
  position: relative;
}

.profile-box .banner > img {
  object-fit: cover;
  object-position: bottom;
  width: 100%;
  height: 100%;
  aspect-ratio: 18/9;
}

.profile-box .title {
  position: absolute;
  bottom: 0;
  display: grid;
  grid-template-columns: max-content auto;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    'a c'
    'a b';
  margin-left: 1rem;
  transform: translateY(2rem);
}

.profile-box .avatar {
  display: inline-block;
  width: 4rem;
  height: 4rem;
  border-radius: 100px;
  border: 3px var(--color-bg-card) solid;
}

.profile-box .bio {
  /* border-radius: 0 0 0.5rem 0.5rem; */
  /* border-bottom: 1px solid var(--vp-c-divider); */
  /* border-top: none; */
  /* margin-top: 2rem; */
  font-size: 0.85em;
  padding: 0.5rem;
  padding-top: 2rem;
}

.link-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.info-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
}

.info-bar .info-item {
  padding: 0.5rem;
  text-align: center;
}

.info-bar .info-item p:first-child {
  font-size: 1.5em;
  font-family: monospace;
}

.info-bar .info-item p:last-child {
  font-size: 0.8em;
}

@media screen and (max-width: 768px) {
  .profile-box {
    position: relative;
    height: unset;
    border-radius: 0;
    max-width: unset;
    box-shadow: none;
  }

  .profile-box .bio {
    /* border-radius: 0; */
    /* border: none; */
    /* border-bottom: 1px rgba(128, 128, 128, 0.25) solid; */
    border-bottom: 1px solid var(--vp-c-divider);
  }
}
</style>
