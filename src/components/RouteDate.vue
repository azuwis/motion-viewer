<script>
import { mapState } from 'vuex'

export default {
  name: 'RouteDate',
  computed: {
    ...mapState([
      'date'
    ])
  },
  watch: {
    '$route' (route, oldRoute) {
      const date = route.params.date
      if (!oldRoute.params.date) {
        this.$store.dispatch('updateVideos', { date, init: true })
      } else if (date !== this.date) {
        this.$store.dispatch('updateVideos', { date })
      }
    },
    date (date) {
      this.$router.push({ params: { date, time: null } })
    }
  },
  created () {
    const date = this.$route.params.date
    if (date) {
      this.$store.dispatch('updateVideos', { date, init: true })
    } else {
      this.$router.replace({ params: { date: this.date } })
    }
  },
  render: h => h()
}
</script>
