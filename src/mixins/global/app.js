import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("app", ["darkMode", "navbarHeight"]),
  },
};
