<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'
import NotebookLMPromptGenerator from '../components/NotebookLMPromptGenerator.vue'

const route = useRoute()
const member = ref(null)
const loading = ref(true)

import { getGraduationStatus } from '../utils/memberUtils'

// 卒部・Last Year判定
const graduationStatus = computed(() => getGraduationStatus(member.value?.birthDate))
const isGraduated = computed(() => graduationStatus.value.isGraduated)
const isLastYear = computed(() => graduationStatus.value.isLastYear)

const youtubeVideoId = computed(() => {
  if (!member.value || !member.value.youtube) {
    return null
  }
  const url = member.value.youtube
  let videoId = null
  // youtube.com/watch?v=VIDEO_ID
  const urlParams = new URLSearchParams(new URL(url).search)
  videoId = urlParams.get('v')
  if (videoId) {
    return videoId
  }
  // youtu.be/VIDEO_ID
  const match = url.match(/youtu\.be\/([^&?]+)/)
  if (match) {
    videoId = match[1]
  }
  return videoId
})

const getSafeUrl = (url) => {
  if (!url) return ''
  const trimmedUrl = url.trim()
  if (/^(javascript|data|vbscript):/i.test(trimmedUrl)) {
    return '#unsafe'
  }
  return trimmedUrl
}

const getSNSPlatform = (url) => {
  if (!url) return 'SNS'
  if (url.includes('twitter.com') || url.includes('x.com')) return 'Twitter/X'
  if (url.includes('instagram.com')) return 'Instagram'
  if (url.includes('facebook.com')) return 'Facebook'
  if (url.includes('linkedin.com')) return 'LinkedIn'
  if (url.includes('tiktok.com')) return 'TikTok'
  if (url.includes('youtube.com')) return 'YouTube'
  return 'SNS'
}

onMounted(async () => {
  // ページが読み込まれたら確実にトップにスクロール
  window.scrollTo({ top: 0, behavior: 'smooth' })

  const memberId = route.params.id
  const docRef = doc(db, 'profiles', memberId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    member.value = docSnap.data()
  } else {
    console.log('No such document!')
  }
  loading.value = false
})
</script>

<template>
  <div class="page-container">
    <div v-if="loading" class="loading-container">
      <div
        class="loading-spinner"
        v-motion
        :initial="{ opacity: 0, scale: 0.5 }"
        :enter="{ opacity: 1, scale: 1, transition: { duration: 600 } }"
      ></div>
      <p
        class="loading-text font-body"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { delay: 300, duration: 500 } }"
      >
        読み込み中...
      </p>
    </div>
    <div
      v-else-if="member"
      class="profile-card"
      data-aos="fade-up"
      data-aos-duration="800"
      v-motion
      :initial="{ opacity: 0, y: 60, scale: 0.95 }"
      :enter="{ opacity: 1, y: 0, scale: 1, transition: { delay: 200, duration: 800 } }"
    >
      <div class="profile-header">
        <div
          class="profile-image-container"
          v-motion
          :initial="{ opacity: 0, scale: 0.8, rotate: -5 }"
          :enter="{ opacity: 1, scale: 1, rotate: 0, transition: { delay: 400, duration: 800 } }"
        >
          <img
            :src="member.profileImageUrl || 'https://via.placeholder.com/200'"
            alt="プロフィール画像"
            class="profile-image-large"
          />
          <div class="image-glow"></div>
        </div>
        <p v-if="member.phoneticName" class="member-phonetic-name font-ui">
          {{ member.phoneticName }}
        </p>
        <h1 class="member-name font-display">
          {{ member.name }}
        </h1>
        <div
          v-if="
            member.currentRole ||
            (member.pastRoles && member.pastRoles.length > 0) ||
            (member.roleHistory && member.roleHistory.length > 0) ||
            member.enrollmentYear ||
            isGraduated ||
            isLastYear
          "
          class="member-badges"
        >
          <span v-if="isGraduated" class="graduated-badge">🎓 卒部</span>
          <span v-if="isLastYear" class="last-year-badge">🔥 Last Year</span>
          <span v-if="member.currentRole" class="current-role-badge"
            >🏅 現 {{ member.currentRole }}</span
          >
          <span
            v-for="role in member.pastRoles || member.roleHistory || []"
            :key="role"
            class="past-role-badge"
            >📜 {{ role }}経験</span
          >
          <span v-if="member.enrollmentYear" class="enrollment-badge"
            >📅 {{ member.enrollmentYear }}年入部</span
          >
        </div>
        <p class="member-title font-ui">部員プロフィール</p>
      </div>

      <div class="profile-details">
        <div class="detail-card">
          <div class="detail-icon">🏢</div>
          <div class="detail-content">
            <h3 class="detail-label font-subheading">会社名</h3>
            <p class="detail-value font-body">{{ member.company || '未設定' }}</p>
          </div>
        </div>

        <div class="detail-card bio-card">
          <div class="detail-icon">📝</div>
          <div class="detail-content">
            <h3 class="detail-label font-subheading">自己紹介・事業内容</h3>
            <div class="detail-value bio font-body text-content">
              {{ member.bio || '未設定です' }}
            </div>
          </div>
        </div>

        <div v-if="member.needs" class="detail-card">
          <div class="detail-icon">🎯</div>
          <div class="detail-content">
            <h3 class="detail-label font-subheading">どのようなニーズに対応できるか</h3>
            <div class="detail-value text-content">{{ member.needs }}</div>
          </div>
        </div>

        <div v-if="member.pastTransactions" class="detail-card">
          <div class="detail-icon">🤝</div>
          <div class="detail-content">
            <h3 class="detail-label font-subheading">過去に青年部内で取引した事例</h3>
            <div class="detail-value text-content">{{ member.pastTransactions }}</div>
          </div>
        </div>

        <div v-if="member.providableInfo" class="detail-card">
          <div class="detail-icon">💡</div>
          <div class="detail-content">
            <h3 class="detail-label font-subheading">提供できる情報</h3>
            <div class="detail-value text-content">{{ member.providableInfo }}</div>
          </div>
        </div>

        <div v-if="member.seekingInfo" class="detail-card">
          <div class="detail-icon">🔍</div>
          <div class="detail-content">
            <h3 class="detail-label font-subheading">求めている情報</h3>
            <div class="detail-value text-content">{{ member.seekingInfo }}</div>
          </div>
        </div>

        <div v-if="member.website" class="detail-card">
          <div class="detail-icon">🌐</div>
          <div class="detail-content">
            <h3 class="detail-label font-subheading">ウェブサイト</h3>
            <a :href="getSafeUrl(member.website)" target="_blank" class="detail-link font-body">{{
              member.website
            }}</a>
          </div>
        </div>

        <div
          v-if="
            member.twitter || member.facebook || member.instagram || member.tiktok || member.sns
          "
          class="detail-card"
        >
          <div class="detail-icon">📢</div>
          <div class="detail-content">
            <h3 class="detail-label font-subheading">SNS</h3>
            <div class="sns-links-wrapper">
              <a
                v-if="member.twitter"
                :href="getSafeUrl(member.twitter)"
                target="_blank"
                rel="noopener noreferrer"
                class="sns-btn sns-twitter"
                >𝕏 X (Twitter)</a
              >
              <a
                v-if="member.facebook"
                :href="getSafeUrl(member.facebook)"
                target="_blank"
                rel="noopener noreferrer"
                class="sns-btn sns-facebook"
                >📘 Facebook</a
              >
              <a
                v-if="member.instagram"
                :href="getSafeUrl(member.instagram)"
                target="_blank"
                rel="noopener noreferrer"
                class="sns-btn sns-instagram"
                >📸 Instagram</a
              >
              <a
                v-if="member.tiktok"
                :href="getSafeUrl(member.tiktok)"
                target="_blank"
                rel="noopener noreferrer"
                class="sns-btn sns-tiktok"
                >🎵 TikTok</a
              >
              <a
                v-if="
                  member.sns &&
                  !member.twitter &&
                  !member.facebook &&
                  !member.instagram &&
                  !member.tiktok
                "
                :href="getSafeUrl(member.sns)"
                target="_blank"
                rel="noopener noreferrer"
                class="sns-btn sns-other"
                >🔗 その他SNS</a
              >
            </div>
          </div>
        </div>

        <div v-if="member.youtube" class="detail-card">
          <div class="detail-icon">📺</div>
          <div class="detail-content">
            <h3 class="detail-label font-subheading">YouTube</h3>

            <!-- 動画が埋め込める場合 -->
            <div v-if="youtubeVideoId" class="youtube-embed-container">
              <iframe
                :src="`https://www.youtube.com/embed/${youtubeVideoId}`"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="youtube-iframe"
              ></iframe>
            </div>

            <!-- 埋め込めない場合（チャンネルリンクなど） -->
            <a
              v-else
              :href="getSafeUrl(member.youtube)"
              target="_blank"
              class="sns-btn sns-youtube"
              style="margin-top: 0.5rem"
            >
              ▶️ チャンネルを見る
            </a>
          </div>
        </div>
      </div>

      <!-- NotebookLM Prompt Generator Area -->
      <NotebookLMPromptGenerator :member="member" />
    </div>
    <div v-else class="error-container">
      <div class="error-icon">⚠️</div>
      <p class="error-text">ユーザーが見つかりませんでした</p>
    </div>
  </div>
</template>

<style scoped>
.page-container {
  padding: 0;
  max-width: none;
  margin: 0;
  width: 100%;
  min-height: 100vh;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--color-border);
  border-top: 4px solid var(--vt-c-brand);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: var(--vt-c-text-dark-2);
  font-size: 1.125rem;
}

.profile-card {
  background: var(--color-background);
  border: none;
  border-radius: 0;
  padding: 2rem 1rem;
  box-shadow: none;
  position: relative;
  overflow: visible;
  min-height: 100vh;
}

.profile-header {
  text-align: center;
  margin-bottom: 3rem;
}

.profile-image-container {
  position: relative;
  display: inline-block;
  margin-bottom: 1.5rem;
}

.profile-image-large {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: contain;
  object-position: center;
  background: var(--color-background-soft);
  border: 4px solid var(--color-border);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;
}

.image-glow {
  position: absolute;
  top: -4px;
  left: -4px;
  right: -4px;
  bottom: -4px;
  border-radius: 50%;
  background: linear-gradient(45deg, var(--vt-c-brand), var(--vt-c-brand-hover));
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.profile-image-container:hover .image-glow {
  opacity: 0.3;
}

.profile-image-container:hover .profile-image-large {
  border-color: var(--vt-c-brand);
  box-shadow: 0 16px 40px rgba(59, 130, 246, 0.4);
}

.member-name {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--color-heading);
  background: linear-gradient(135deg, var(--vt-c-brand), var(--vt-c-brand-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.member-phonetic-name {
  font-size: 1rem;
  color: var(--vt-c-text-dark-2);
  margin-bottom: 0.25rem;
  font-weight: 500;
  letter-spacing: 0.05em;
}

.member-title {
  font-size: 1.125rem;
  color: var(--vt-c-text-dark-2);
  font-weight: 500;
}

.member-badges {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 0.5rem 0;
}

.current-role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #92400e;
  background: linear-gradient(135deg, #fef3c7, #fde68a);
  border: 1px solid #f59e0b;
  border-radius: 2rem;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
}

.past-role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vt-c-text-dark-2);
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 2rem;
}

.enrollment-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vt-c-text-dark-2);
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 2rem;
}

.last-year-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #9f1239;
  background: linear-gradient(135deg, #ffe4e6, #fecdd3);
  border: 1px solid #f43f5e;
  border-radius: 2rem;
  box-shadow: 0 2px 8px rgba(244, 63, 94, 0.3);
  animation: pulse-border 2s infinite;
}

@keyframes pulse-border {
  0% {
    box-shadow: 0 0 0 0 rgba(244, 63, 94, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(244, 63, 94, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(244, 63, 94, 0);
  }
}

.graduated-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.4rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #581c87;
  background: linear-gradient(135deg, #f3e8ff, #e9d5ff);
  border: 1px solid #a855f7;
  border-radius: 2rem;
  box-shadow: 0 2px 8px rgba(168, 85, 247, 0.2);
}

.profile-details {
  display: grid;
  gap: 1.5rem;
}

.detail-card {
  background: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.detail-card:hover {
  border-color: var(--vt-c-brand);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(59, 130, 246, 0.2);
}

.detail-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  padding: 0.5rem;
  background: var(--color-background-soft);
  border-radius: 0.75rem;
  border: 1px solid var(--color-border);
}

.detail-content {
  flex: 1;
}

.detail-label {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vt-c-text-dark-2);
  margin-bottom: 0.5rem;
}

.detail-value {
  font-size: 1.125rem;
  color: var(--color-text);
  line-height: 1.6;
}

.text-content {
  white-space: pre-wrap;
  word-wrap: break-word;
}

.bio {
  background: transparent;
  padding: 0.5rem 0;
  border-radius: 0;
  border: none;
  font-size: 1.1rem;
  line-height: 1.7;
}

.bio-card {
  grid-column: 1 / -1;
}

.activity-card {
  grid-column: 1 / -1;
}

.activity {
  background: linear-gradient(135deg, var(--color-background-soft), var(--color-background-mute));
  padding: 1rem;
  border-radius: 0.5rem;
  border-left: 4px solid var(--vt-c-brand);
  font-style: italic;
  line-height: 1.7;
}
.sns-links-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.sns-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.35rem 0.75rem;
  border-radius: 2rem;
  font-size: 0.8rem;
  font-weight: 600;
  color: #ffffff !important;
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.sns-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  color: #ffffff !important;
}

.sns-twitter {
  background-color: #0f1419;
}
.sns-facebook {
  background-color: #1877f2;
}
.sns-instagram {
  background: linear-gradient(
    45deg,
    #f09433 0%,
    #e6683c 25%,
    #dc2743 50%,
    #cc2366 75%,
    #bc1888 100%
  );
}
.sns-tiktok {
  background-color: #000000;
  border: 1px solid rgba(255, 255, 255, 0.2);
}
.sns-youtube {
  background-color: #ff0000;
}
.sns-other {
  background-color: #64748b;
}

.youtube-embed-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 アスペクト比 */
  margin-top: 0.5rem;
}

.youtube-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
}

.sns-icon {
  font-size: 1rem;
}

.detail-link {
  color: var(--vt-c-brand);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  word-break: break-all;
}

.detail-link:hover {
  color: var(--vt-c-brand-hover);
  text-decoration: underline;
}

.error-container {
  text-align: center;
  padding: 3rem;
  color: var(--vt-c-text-dark-2);
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-text {
  font-size: 1.25rem;
}

.profile-section .icon {
  width: 20px;
  height: 20px;
}

.profile-section p,
.profile-section a,
.profile-section div.text-content {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--color-text);
  white-space: pre-wrap; /* 改行とスペースを保持し、自動で折り返す */
  word-wrap: break-word; /* 長い単語を折り返す */
  overflow-wrap: break-word;
}

.profile-links {
  display: flex;
}

@media (max-width: 768px) {
  .page-container {
    padding: 0;
  }

  .profile-card {
    padding: 1.5rem 1rem;
    border-radius: 0;
  }

  .profile-header {
    margin-bottom: 2rem;
  }

  .profile-image-large {
    width: 150px;
    height: 150px;
  }

  .member-name {
    font-size: 2rem;
  }

  .detail-card {
    background: transparent !important;
    border: none !important;
    border-radius: 0 !important;
    box-shadow: none !important;
    padding: 1.5rem 0 !important;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    border-bottom: 1px solid var(--color-border) !important;
  }

  .detail-card:hover {
    transform: none !important;
  }

  .detail-value {
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  .text-content {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .bio {
    white-space: pre-wrap;
    word-break: break-word;
  }

  .detail-content {
    width: 100%;
  }

  .detail-value {
    font-size: 1.2rem;
  }

  .bio {
    font-size: 1.15rem;
    line-height: 1.8;
  }

  .profile-section h3 {
    font-size: 1.1rem;
    padding-left: 0;
    margin-bottom: 0.75rem;
  }

  .profile-section p,
  .profile-section a,
  .profile-section div.text-content {
    font-size: 0.95rem;
    line-height: 1.7;
    white-space: pre-wrap; /* こちらにも適用 */
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
}
</style>
