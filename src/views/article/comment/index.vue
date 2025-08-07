<template>
  <el-tree
    ref="leftTreeRef"
    style="max-width: 600px"
    :data="data"
    default-expand-all
    node-key="id"
    highlight-current
    show-checkbox
    :props="defaultProps"
    :render-content="renderContent"
    :filter-node-method="filterLeft"
  />

  <div class="mt-2">
    <el-button @click="moveTo('right')">down</el-button>
    <el-button @click="moveTo('left')">up</el-button>
  </div>

  <el-tree
    ref="rightTreeRef"
    style="max-width: 600px"
    :data="data"
    default-expand-all
    node-key="id"
    highlight-current
    show-checkbox
    :props="defaultProps"
    :render-content="renderContent"
    :filter-node-method="filterRight"
  />

  <div class="mt-2">
    <el-button @click="getLeftNode">getLeftSelectNode</el-button>
    <el-button @click="getRightNode">getRightNode</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref, h, onMounted } from 'vue'
import { ElCheckbox } from 'element-plus'

import type {  TreeInstance } from 'element-plus'
const leftTreeRef = ref<TreeInstance>()
const rightTreeRef = ref<TreeInstance>()
const defaultProps = {
  children: 'children',
  label: 'label',
}

const positionMap = new Map<string,'left' | 'right' | 'middle'>()
const data: any[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]

const updateMiddleStates = (tree) => {
  // 递归函数,遍历tree数组,得到每个id对应的状态即可
  const dfs = (node) => {

    // 如果节点有没有孩子或孩子长度为0
    if(!node.children?.length){
      // 拿到当前节点是否为right,若不存在的节点则返回undefined,不等于right,则其状态为left
      positionMap.set(node.id,positionMap.get(node.id) === 'right' ? 'right' : 'left')
      return positionMap.get(node.id) === 'right' ? 'right' : 'left'
    }

    // 如果有孩子则,递归孩子
    const childPositions = node.children.map(dfs)
    const hasRight = childPositions.includes('right')
    const hasLeft = childPositions.includes('left')
    console.log(childPositions)
    // 如果有左且有右,则为middle
    if(hasLeft && hasRight) {
      positionMap.set(node.id,'middle')
      return 'mixed'
    }else if(hasRight){
      positionMap.set(node.id, 'right')
      return 'right'
    }else if(hasLeft){
      positionMap.set(node.id, 'left')
      return 'left'
    }
  }
  tree.forEach(dfs)
}
updateMiddleStates(data)
// 左侧渲染函数
const filterLeft = (_value, data) => {
  const pos = positionMap.get(data.id) ?? 'left';
  return pos === 'left' || pos === 'middle';
}
// 右侧渲染函数
const filterRight = (_value, data) => {
  const pos = positionMap.get(data.id) ?? 'right';
  return pos === 'right' || pos === 'middle';
}

const moveTo = (side:'left' | 'right') => {
  // 从左侧获取全选叶子节点
  leftTreeRef.value.getCheckedKeys(true).forEach((id:string)=>{
    // 遍历全选叶子节点
    positionMap.set(id, side)
  })
  // 更新节点状态
  updateMiddleStates(data)

  leftTreeRef.value.filter('')
  rightTreeRef.value.filter('')
  leftTreeRef.value.setCheckedKeys([])
  rightTreeRef.value.setCheckedKeys([])
}

const getLeftNode = () => {
  console.log(leftTreeRef.value.getCheckedNodes(false,true))
}
const getRightNode = () => {
  console.log(rightTreeRef.value.getCheckedNodes(false,true))
}

onMounted(()=>{
  leftTreeRef.value.filter('')
  rightTreeRef.value.filter('')
})

const renderContent = (_h: any, { node, data, store }) => {
  return h(
    'span',
    { style: 'display: flex; align-items: center;justify-content:space-between;width: 100%;' },
    [
      h('span', node.label),
      h(ElCheckbox, {
        modelValue: node.checked,
        disabled: node.data.disabled,
        indeterminate: node.indeterminate,
        checked: node.data.checked,
        onChange: (val: any) => {
          store.setChecked(data, val, true)
        },
        onClick: (event: Event) => {
          event.stopPropagation()
        },
        style: 'margin-left: 8px;',
      }),
    ],
  )
}
</script>
<style lang="scss" scoped>
</style>
