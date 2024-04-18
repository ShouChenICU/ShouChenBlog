<template>
  <div :class="$style['profile-box']">
    <div :class="$style['banner']">
      <img src="/banner.webp" />
      <div :class="$style['title']">
        <img :class="$style['avatar']" style="grid-area: a" src="/favicon.webp" alt="banner" />
      </div>
    </div>
    <div :class="$style['bio']">
      <p style="font-weight: bold; font-size: 1.15em; margin-bottom: 0.25rem">守晨</p>
      <p>Hi 欢迎访问我的博客</p>
      <p>💻不想上班的程序员 / 🍥Debian忠实粉</p>
      <p>🎧音乐发烧友 / 🌸AI绘画小白</p>
      <p>🐱想养猫 (或猫娘) / 🍀做自己喜欢的事</p>
      <p>
        <a style="color: #51a8dd" href="https://miaobox.cc" target="_blank">miaobox.cc</a
        >一个本地优先的实用工具箱
      </p>
    </div>
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
  position: relative;
  background-color: var(--color-bg-card);
  border-radius: 0.5rem;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.23),
    0 1px 6px rgba(0, 0, 0, 0.16);
  margin-bottom: 5rem;
  overflow: hidden;
}

.profile-box .banner {
  position: relative;
}

.profile-box .banner > img {
  object-fit: cover;
  /* object-position: bottom; */
  width: 100%;
  height: 100%;
  aspect-ratio: 3;
}

.profile-box .title {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  translate: 0 2rem;
  /* transform: translateY(2rem); */
}

.profile-box .avatar {
  display: block;
  width: 5rem;
  height: 5rem;
  border-radius: 100px;
  border: 3px var(--color-bg-card) solid;
  margin: 0 auto;
}

.profile-box .bio {
  /* border-radius: 0 0 0.5rem 0.5rem; */
  /* border-bottom: 1px solid var(--vp-c-divider); */
  /* border-top: none; */
  /* margin-top: 2rem; */
  text-align: center;
  font-size: 0.9em;
  padding: 0.5rem;
  padding-top: 2rem;
  line-height: 2.25;
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
    box-shadow: none;
  }

  .profile-box .banner > img {
    aspect-ratio: 16/9;
  }

  .profile-box .bio {
    /* border-radius: 0; */
    /* border: none; */
    /* border-bottom: 1px rgba(128, 128, 128, 0.25) solid; */
    /* border-bottom: 1px solid var(--vp-c-divider); */
  }
}
</style>
