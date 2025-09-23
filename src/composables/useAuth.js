// src/composables/useAuth.js
import { ref, onUnmounted, readonly } from 'vue';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const user = ref(auth.currentUser);

const unsubscribe = onAuthStateChanged(auth, (u) => {
  user.value = u;
});

onUnmounted(() => {
  unsubscribe();
});

const useAuth = () => {
  return { user: readonly(user) }; // 外部からは変更できないように readonly にする
};

export { useAuth };
