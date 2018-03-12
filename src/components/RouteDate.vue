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
    '$route' (route) {
      const date = route.params.date
      this.$store.dispatch('updateVideos', { date })
    },
    date (date) {
      this.$router.push({ params: { date, time: null } })
    }
  },
  created () {
    const date = this.$route.params.date
    if (date) {
      this.$store.dispatch('updateVideos', { date })
    } else if (this.date) {
      this.$router.replace({ params: { date: this.date } })
    } else {
      this.$store.dispatch('updateVideos', { date: 'today' })
    }
  },
  render: h => h()
}
</script>
