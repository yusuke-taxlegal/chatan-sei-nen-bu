<template>
  <div class="about-page">
    <!-- ヒーローセクション -->
    <section class="hero-section">
      <div
        class="hero-content"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
      >
        <h1 class="hero-title font-display">商工会青年部</h1>
        <p class="hero-subtitle font-subheading">脈々と受け継がれる、若き事業家たちの魂</p>
      </div>
      <div class="hero-background"></div>
    </section>

    <!-- 商工会青年部宣言 -->
    <section class="declaration-section container">
      <div
        class="glass-card declaration-card"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800 } }"
      >
        <h2 class="section-title">商工会青年部宣言</h2>
        <div class="title-divider"></div>
        <div class="declaration-text font-body">
          <p class="highlight-lead">かけがえのない人たちと、かけがえのない地域の為に</p>
          <p>
            われわれは、自己の利益追求のみならず、国家を基盤とした社会の恒久的な平和と繁栄を実現する。
          </p>
          <p>
            若き事業家として、何人にも侵されない自立した経営を確立し、地域の商工業を躍動させ、地域の一員としてその責任を自覚すると共に先人の教えに学びつつ、未来に向けた活力ある社会を創出する。
          </p>
          <p>
            この美しい国、日本に生きる者として、地球の環境問題を捉え、われわれだけでなく、次世代の人々の為にも、継続的な運動を推し進める。
          </p>
          <p>
            そして全ての国家、民族との交流を積極的に図り永続的共生を同じ時代を担う者としてここに誓う。
          </p>
        </div>
      </div>
    </section>

    <!-- 誓いの言葉 -->
    <section class="oath-section container">
      <div
        class="glass-card oath-card"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }"
      >
        <h2 class="section-title">誓いの言葉</h2>
        <div class="title-divider"></div>
        <div class="oath-text font-body">
          <div class="oath-item">
            <span class="oath-bullet">一、</span>
            <p>われわれ商工会青年部は、創造力と行動力をいかし、地域振興発展の先駆者となる。</p>
          </div>
          <div class="oath-item">
            <span class="oath-bullet">一、</span>
            <p>
              われわれ商工会青年部は、商工会の後継者であり、将来の中核として、組織活性化の推進力となる。
            </p>
          </div>
          <div class="oath-item">
            <span class="oath-bullet">一、</span>
            <p>
              われわれ商工会青年部は、社会一般の福祉の増進に努め、新しいまちづくりの原動力となる。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 青年部の歌 -->
    <section class="song-section container">
      <div
        class="glass-card song-card"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 800 } }"
      >
        <h2 class="section-title">青年部の歌</h2>
        <div class="title-divider"></div>

        <div class="song-content">
          <div class="song-header">
            <h3 class="song-title">明日をつくる友だち</h3>
            <p class="song-author">作詞: 加藤 日出夫 / 作曲: 米山 正夫</p>
          </div>

          <div class="lyrics-grid font-body">
            <div class="lyrics-block">
              <h4 class="verse-num">一、</h4>
              <p>
                何かが 何かが<br />つよく 求められている<br />その何かに 夢をかけて<br />永遠に
                歩きつづける<br />われら 商工会青年部
              </p>
            </div>
            <div class="lyrics-block">
              <h4 class="verse-num">二、</h4>
              <p>
                それでも それでも<br />君は なぜかあきらめず<br />この時代の 波に向う<br />そして君と
                ほほえむ<br />われら 商工会青年部
              </p>
            </div>
            <div class="lyrics-block">
              <h4 class="verse-num">三、</h4>
              <p>
                幾度も 幾度も<br />夢をくだく カベがある<br />だが終りは いつも来ない<br />明日をつくる
                友だち<br />われら 商工会青年部
              </p>
            </div>
          </div>

          <div class="audio-player-container">
            <div class="player-label">🎵 音源を再生する</div>
            <!-- 青年部の歌の音源 -->
            <audio controls class="custom-audio">
              <source src="/audio/impulse-song.mp3" type="audio/mpeg" />
              お使いのブラウザは音声要素をサポートしていません。
            </audio>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding-bottom: 5rem;
  background-color: var(--color-background);
  overflow-x: hidden;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* ヒーローセクション */
.hero-section {
  position: relative;
  height: 40vh;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 4rem;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 58, 138, 0.8)),
    url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80');
  background-size: cover;
  background-position: center;
  z-index: 0;
}

.hero-content {
  position: relative;
  z-index: 1;
  color: white;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  letter-spacing: 0.05em;
}

.hero-subtitle {
  font-size: 1.25rem;
  font-weight: 500;
  opacity: 0.9;
}

/* 共通ガラスモーフィズムカード */
.glass-card {
  background: var(--color-background-soft);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  padding: 3rem 4rem;
  margin-bottom: 3rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
}

.glass-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--vt-c-brand), var(--vt-c-brand-hover));
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
}

.section-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 1rem;
  letter-spacing: 0.1em;
}

.title-divider {
  width: 60px;
  height: 4px;
  background: var(--vt-c-brand);
  margin: 0 auto 2.5rem;
  border-radius: 2px;
}

/* 宣言セクション */
.declaration-text {
  line-height: 2;
  font-size: 1.15rem;
  color: var(--color-text);
  text-align: justify;
}

.declaration-text p {
  margin-bottom: 1.5rem;
}

.highlight-lead {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--vt-c-brand);
  text-align: center;
  margin-bottom: 2.5rem !important;
}

/* 誓いの言葉セクション */
.oath-text {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.oath-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background: rgba(var(--vt-c-brand-rgb), 0.03);
  padding: 1.5rem;
  border-radius: 1rem;
  border-left: 4px solid var(--vt-c-brand);
  transition: background 0.3s ease;
}

.oath-item:hover {
  background: rgba(var(--vt-c-brand-rgb), 0.08);
}

.oath-bullet {
  font-weight: 800;
  font-size: 1.4rem;
  color: var(--vt-c-brand);
  line-height: 1.2;
}

.oath-item p {
  font-size: 1.2rem;
  line-height: 1.8;
  color: var(--color-heading);
  font-weight: 500;
  margin: 0;
}

/* 歌セクション */
.song-header {
  text-align: center;
  margin-bottom: 3rem;
}

.song-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--color-heading);
  margin-bottom: 0.5rem;
}

.song-author {
  color: var(--vt-c-text-dark-2);
  font-size: 0.95rem;
}

.lyrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
}

.lyrics-block {
  background: var(--color-background);
  padding: 2rem;
  border-radius: 1rem;
  border: 1px solid var(--color-border);
  text-align: center;
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.02);
}

.verse-num {
  color: var(--vt-c-brand);
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.lyrics-block p {
  line-height: 2.2;
  font-size: 1.05rem;
  color: var(--color-text);
}

.audio-player-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(145deg, var(--color-background-mute), var(--color-background));
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.player-label {
  font-weight: 600;
  color: var(--vt-c-brand);
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.custom-audio {
  width: 100%;
  max-width: 500px;
  outline: none;
}

.custom-audio::-webkit-media-controls-panel {
  background-color: var(--color-background-soft);
}

.custom-audio::-webkit-media-controls-play-button,
.custom-audio::-webkit-media-controls-mute-button {
  background-color: var(--color-background);
  border-radius: 50%;
}

/* レスポンシブ対応 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .glass-card {
    padding: 2rem 1.5rem;
  }

  .lyrics-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .declaration-text {
    font-size: 1.05rem;
  }

  .oath-item p {
    font-size: 1.05rem;
  }
}
</style>
