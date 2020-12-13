<template>
  <div class="about">

  <div class="p-text-left p-grid start">
    <div class="p-col-12 p-md-6 p-lg-3">
      <p>dp[0][j] = 0</p>
      <p>dp[i+1][j] = </p>
      <p>dp[i][j] (j &lt; w[i]) </p>
      <p>max(dp[i][j], dp[i][j-対象の重さw[i]] + value)</p>
    </div>
  </div>

    <Button @click="culc">Start</Button>
    <br>
    <br>

    <DataTable :value="state.dp">

      <Column
        v-for="(col, index) in state.columns"
        :field="col.field"
        :header="col.header"

        :key="col.field + 'tmp' + index"
      >
        <template #body="slotProps">
          <div :class="slotProps.data.colors[col.field]">
            {{ slotProps.data[col.field] }}
          </div>
        </template>
      </Column>
    </DataTable>
    <br>
    <br>
    <Tag :value="'Total weight: ' + state.weight"/>
    <DataTable :value="state.nup">
      <Column field="v" header="Value"></Column>
      <Column field="w" header="Weight"></Column>
    </DataTable>
  </div>
</template>

<style scoped>
.pink {
  background-color: pink !important;
}
.gray {
  background-color: gray !important;
}
.yellow {
  background-color: yellow !important;
}
</style>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue';

type nupType = {
  w: number;
  v: number;
};

type dpType = {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  color: string;
};
export default defineComponent({
  setup() {
    const state = reactive<{
      weight: number;
      nup: nupType[];
      columns: object[];
      dp: any[];
    }>({
      weight: 5,
      nup: [
        { w: 2, v: 3 },
        { w: 1, v: 2 },
        { w: 3, v: 4 },
        { w: 2, v: 2 },
      ],
      columns: [
        { field: '0', header: '0' },
        { field: '1', header: '1' },
        { field: '2', header: '2' },
        { field: '3', header: '3' },
        { field: '4', header: '4' },
        { field: '5', header: '5' },
      ],
      dp: [
        {
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          colors: {
            0: '',
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
          },
        },
      ],
    });
    // const messageTwo = ref<string>("こんにちは");

    function prepare(): void {
      for (let i = 0; i < state.nup.length; i += 1) {
        state.dp.push({
          0: 0,
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          colors: {
            0: '',
            1: '',
            2: '',
            3: '',
            4: '',
            5: '',
          },
        });
      }
    }

    function setColor(t: any, j: any, s: string) {
      console.table(t);
      t.colors[j] = s; // eslint-disable-line no-param-reassign
    }

    async function culc() {
      for (let i = 0; i < state.dp.length - 1; i += 1) {
        for (let j = 0; j <= state.weight; j += 1) {
          setColor(state.dp[i + 1], j, 'gray');

          // eslint-disable-next-line
          await new Promise((resolve) => setTimeout(resolve, 1000));

          if (j < state.nup[i].w) {
            setColor(state.dp[i], j, 'yellow');
            // eslint-disable-next-line
            await new Promise((resolve) => setTimeout(resolve, 500));
            state.dp[i + 1][j] = state.dp[i][j];
            setColor(state.dp[i], j, '');
          } else {
            setColor(state.dp[i], j, 'pink');
            setColor(state.dp[i], j - state.nup[i].w, 'pink');
            // eslint-disable-next-line
            await new Promise((resolve) => setTimeout(resolve, 1000));
            state.dp[i + 1][j] = Math.max(
              state.dp[i][j],
              state.dp[i][j - state.nup[i].w] + state.nup[i].v,
            );
            setColor(state.dp[i], j, '');
            setColor(state.dp[i], j - state.nup[i].w, '');
            // setColor(state.dp[i + 1], j, 'pink');
          }
          setColor(state.dp[i + 1], j, '');
        }
        // for (let j = 0; j <= state.weight; j += 1) {
        //   if (j < state.nup[i].w) {
        //     state.dp[i + 1][j] = state.dp[i][j];
        //   } else {
        //     state.dp[i + 1][j] = Math.max(
        //       state.dp[i][j],
        //       state.dp[i][j - state.nup[i].w] + state.nup[i].v,
        //     );
        //   }
        // }
      }
    }

    onMounted(() => {
      prepare();
      // culc();
    });

    return {
      state,
      culc,
    };
  },
});
</script>
