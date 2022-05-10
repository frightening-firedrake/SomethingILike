<template>
  <div class="app-container">
    <div class="panel">
      <div class="title">{{ $route.meta.title }}</div>
      <el-form ref="form" :model="form" label-width="80px">
		<%_ keyList.forEach((v)=>{ _%>
		<%_ if(v.formType=='input'){ _%>
        <el-form-item label="<%= v.label %>">
          <el-input v-model="form.<%= v.name %>" placeholder="请输入<%= v.label %>"></el-input>
        </el-form-item>
		<%_ } _%>
		<%_ if(v.formType=='textarea'){ _%>
		<el-form-item label="<%= v.label %>">
		  <el-input type="textarea" v-model="form.<%= v.name %>" placeholder="请输入<%= v.label %>"></el-input>
		</el-form-item>
		<%_ } _%>
		<%_ if(v.formType=='input_qr'){ _%>
		<el-form-item label="<%= v.label %>">
		  <el-input v-model="form.<%= v.name %>" placeholder="请输入<%= v.label %>"></el-input>
		</el-form-item>
		<br>
		<vue-qr class="input_qr" :logo-src="logo" :text="form.<%= v.name %>" :size="150" />
		<%_ } _%>
		<%_ if(v.formType=='input_num'){ _%>
		<el-form-item label="<%= v.label %>">
		  <el-input-number v-model="form.<%= v.name %>" placeholder="请输入<%= v.label %>" :precision="0" :controls="false" />
		</el-form-item>
		<%_ } _%>
		<%_ if(v.formType=='radio'){ _%>
		<el-form-item label="<%= v.label %>">
		  <el-radio-group v-model="form.<%= v.name %>">
			<%_ v.childrens.forEach((v2)=>{ _%>
		    <el-radio label="<%= v2.label %>"></el-radio>
			<%_ }) _%>
		  </el-radio-group>
		</el-form-item>
		<%_ } _%>
		<%_ if(v.formType=='select'){ _%>
		<el-form-item label="<%= v.label %>">
		  <el-select v-model="form.<%= v.name %>" placeholder="请选择<%= v.label %>">
			<%_ v.childrens.forEach((v2)=>{ _%>
		    <el-option label="<%= v2.label %>" value="<%= v2.value %>"></el-option>
			<%_ }) _%>
		  </el-select>
		</el-form-item>
		<%_ } _%>
		<%_ if(v.formType=='switch'){ _%>
		<el-form-item label="<%= v.label %>">
          <el-switch v-model="form.<%= v.name %>"></el-switch>
		</el-form-item>
		<%_ } _%>
		<%_ if(v.formType=='checkbox'){ _%>
		<el-form-item label="<%= v.label %>">
		  <el-checkbox v-model="form.<%= v.name %>">开启</el-checkbox>
		</el-form-item>
		<%_ } _%>
		<%_ if(v.formType=='dates'){ _%>
		<el-form-item label="<%= v.label %>">
		  <el-checkbox v-model="form.<%= v.name %>">开启</el-checkbox>
		  <el-date-picker
		    v-model="form.<%= v.name %>"
		    type="daterange"
		    align="right"
		    value-format="yyyy-MM-dd"
		    unlink-panels
		    range-separator="至"
		    start-placeholder="开始日期"
		    end-placeholder="结束日期"
		    :picker-options="pickerOptions2"
		  />
		</el-form-item>
		<%_ } _%>
		<%_ }) _%>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  getXXXXX_001TableNameSome,
  // getXXXXX_001TableNameView,
  // getXXXXX_001TableNameType,
  // XXXXX_001TableNameButtonOne,
  // XXXXX_001TableNameButtonTwo,
  XXXXX_001TableNameCreate
  // XXXXX_001TableNameUpdate,
  // XXXXX_001TableNameDelete
} from '@/api/XXXXX/XXXXX_001TableName'
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'XXXXX001TableNameCreate',
  components: {
    GeneralForm
  },
  data() {
    return {
      form: {
		<%_ keyList.forEach((v)=>{ _%>
		<%= v.name %>:'',
		<%_ }) _%>
	  }
    }
  },

  created() {
    
  },
  methods: {
    getCheckboxList() { // 获取了列表与值
      var id = 2 // 这里的取值有问题我直接去了id=2的全部爱好
      var data = {
        col: 'f_int2,f_string2', // 字段名id和爱好
        type: '=,=', // LIKE，==
        cont: id + ',IS NOT NULL', // 值1,IS NOT NULL
        sort: 'DESC,undefined', // 排序DESC, undefined
        sortIndex: 'f_int2', // 排序字段1
        MaxResultCount: 20, // 条数必填
        SkipCount: 1 // 页数大概必填
      }
      getXXXXX_001TableNameSome(data).then((res) => {
        this.checkboxList = res.result.items // 获取多选框列表
        this.formdataCreator.forEach((v) => {
          if (v.model === 'checkboxesArray1') {
            v.checkboxList = this.checkboxList
          }
        })
      })
    },
    submitForm(formdata) {
      // console.log(formdata)
      // var data = Object.assign(this.newdata, formdata)
      var data = Object.assign(this.row, formdata)
      data.f_tenant = localStorage.tenantId
      this.jsonstr.forEach((v) => {
        data[v] = JSON.stringify(data[v])
      })
      // 如果有这个时间数组开始与结束时间的数组拆开存储
      if (data.dates && data.dates.length) {
        data[this.start] = data.dates[0]
        data[this.end] = data.dates[1]
      }
      // 多选框的循环处理有多少个选项发多少个请求全部更新短时间内应该用不到
      if (data.checkboxesArray1) {
        // console.log(data.checkboxesArray1)
        // console.log(this.checkboxList)
        // 创建多选框烧脑了.....
        this.checkboxList.forEach((v) => {
          // 深克隆一份目前要提交的一条的data数据
          var checkboxData = cloneDeep(data)
          // 修改新建字段名与值与多选框匹配此例子中f_string2对应名f_int3对应值
          if (data.checkboxesArray1.indexOf(v.f_string2) !== -1) {
            checkboxData.f_string2 = v.f_string2
            checkboxData.f_int3 = 1
          } else {
            checkboxData.f_string2 = v.f_string2
            checkboxData.f_int3 = 0
          }
          XXXXX_001TableNameCreate(checkboxData).then((res) => {
            // console.log(res)
            if (res.success) {
              return
            } else {
              this.$message.error('多选新建失败！！！')
            }
          })
        })
      }
      // 基础数据的处理
      XXXXX_001TableNameCreate(data).then((res) => {
        // console.log(res)
        if (res.success) {
          this.$store.dispatch('tagsView/delView', this.$route).then(({
            visitedViews
          }) => {
            // 关闭页面后跳转别的页面
            this.$router.push(this.$route.fullPath.slice(0, this.$route.fullPath.lastIndexOf('/create')))
          })
          this.$notify({
            title: '成功',
            message: '新建成功',
            type: 'success'
          })
        } else {
          this.$message.error('新建失败！！！')
        }
      })
    },
    cancel() {
      this.$store.dispatch('tagsView/delView', this.$route).then(({
        visitedViews
      }) => {
        // 关闭页面后跳转别的页面
        this.$router.push(this.$route.fullPath.slice(0, this.$route.fullPath.lastIndexOf('/create')))
      })
    },
   
  }
}
</script>

<style scoped="scoped">
  .app-container {
    padding: 20px 20px 0 20px;
    background-color: #f0f2f5;
  }

  .panel {
    background: #fff;
    border-radius: 4px;
    /* min-height: calc(100vh - 70px); */
    min-height: calc(100vh - 105px);
  }

  .title {
    padding-left: 14px;
    line-height: 40px;
    font-size: 16px;
    color: #1f2f3d;
  }

  .panel>>>label {
    font-weight: 400;
  }
</style>
