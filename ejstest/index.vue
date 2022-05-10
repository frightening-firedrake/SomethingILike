<template>
  <el-form
    ref="form"
    class="GeneralForm"
    :class="readonly?'readonly':''"
    :model="form"
    :label-width="labelWidth"
    size="mini"
    :rules="rules"
  >
    <template v-for="(item,indexformdataCreator) in formdataCreator">
      <div v-if="item.type=='title'" :key="indexformdataCreator" class="title">{{ item.title }}</div>
      <el-form-item
        v-if="item.type!=='title'&&item.type!=='many'"
        :key="item.model"
        :class="{'inline': item.inline,'short': item.short,'beforeunit': item.beforeunit,'nolable': item.nolabel,}"
        :label="item.label"
        :prop="item.model"
        :size="item.type=='textarea'?'medium':'mini'"
      >
        <!-- readonly模式 -->
        <template v-if="item.type=='readonly'">
          <span class="readonlyspan">{{ form[item.model]||'-' }}</span>
        </template>
        <!-- readonlyDate -->
        <template v-if="item.type=='readonlyDate'">
          <span class="readonlyspan">{{ dateFormat(form[item.model]) }}</span>
        </template>
        <!-- readonlyDates双时间带开始带结束[] -->
        <template v-if="item.type=='readonlyDates'">
          <span class="readonlyspan">{{ datesFormat(form['dates'][0]) }} 至 {{ datesFormat(form['dates'][1]) }}</span>
        </template>
        <template v-if="item.type=='readonlySwitch'">
          <el-switch
            v-model="form[item.model]"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="item.t_label"
            :inactive-value="item.f_label"
            :disabled="item.disabled"
            @change="readonlySwitchChange"
          />
          <span
            class="switch"
            style="color: #606266;margin-left:6px;font-size:12px;"
          >{{ form[item.model]==item.t_label?item.t_label:item.f_label }}</span>
        </template>
        <!-- readonlyInput_qr模式 -->
        <template v-if="item.type=='readonlyInput_qr'">
          <span class="readonlyspan">{{ form[item.model] }}</span>
        </template>
        <!-- readonlyRadio模式 -->
        <template v-if="item.type=='readonlyRadio'">
          <span class="readonlyspan">
            {{ computedReadonlyRadio(form[item.model],item.radioList) }}
          </span>
        </template>

        <!-- 输入框 -->
        <template v-if="item.type=='input'||item.type=='input_num'">
          <el-input-number
            v-if="item.isNum"
            v-model="form[item.model]"
            :placeholder="item.short?(item.beforeunit?'请输入'+item.label:'请输入'):'请输入'+item.label"
            :precision="item.precision?item.precision:0"
            :controls="false"
            :disabled="item.disabled"
            class="left"
          />
          <el-input
            v-else
            v-model="form[item.model]"
            :placeholder="item.short?'请输入':'请输入'+item.label"
            :disabled="item.disabled"
          />
        </template>
        <!-- 输入框+二维码 -->
        <template v-if="item.type=='input_qr'">
          <el-input-number
            v-if="item.isNum"
            v-model="form[item.model]"
            :placeholder="item.short?'请输入':'请输入'+item.label"
            :precision="item.precision?item.precision:0"
            :controls="false"
            :disabled="item.disabled"
            class="left"
          />
          <el-input
            v-else
            v-model="form[item.model]"
            :disabled="item.disabled"
            :placeholder="item.short?'请输入':'请输入'+item.label"
          />
        </template>

        <!-- 下拉框  -->
        <template v-if="item.type=='select'">
          <el-select
            v-model="form[item.model]"
            :placeholder="item.short?'请选择':'请选择'+item.label"
            :disabled="item.disabled"
          >
            <el-option
              v-for="(optionItem,index) in item.optionList"
              :key="index"
              :label="optionItem.label"
              :value="optionItem.value"
            />
          </el-select>
        </template>
        <!-- 多选下拉框  -->
        <template v-if="item.type=='selectGroup'">
          <el-select
            v-model="form[item.model]"
            multiple
            :placeholder="item.short?'请选择':'请选择'+item.label"
            :disabled="item.disabled"
          >
            <el-option v-for="item2 in item.optionList" :key="item2.value" :label="item2.label" :value="item2.value" />
          </el-select>
        </template>
        <!-- 时间日期这个类型有点多需要再修改 -->
        <template v-if="item.type=='date'">
          <el-date-picker
            v-model="form[item.model]"
            :disabled="item.disabled"
            align="right"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
          />
        </template>

        <template v-if="item.type=='dates'">
          <el-date-picker
            v-model="form[item.model]"
            :disabled="item.disabled"
            type="daterange"
            align="right"
            value-format="yyyy-MM-dd"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions2"
          />
        </template>
        <!-- 文字版 -->
        <template v-if="item.type=='switch'">
          <el-switch
            v-model="form[item.model]"
            :active-value="item.t_label"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :inactive-value="item.f_label"
            :disabled="item.disabled"
          />
          <span
            class="switch"
            style="color: #606266;margin-left:6px;font-size:12px;"
          >{{ form[item.model]==item.t_label?item.t_label:item.f_label }}</span>
        </template>
        <!-- 文字版 -->
        <template v-if="item.type=='checkbox'">
          <el-checkbox v-model="form[item.model]" :true-label="item.t_label||item.text||'开启'" :false-label="item.f_label||'关闭'" :disabled="item.disabled">
            {{ item.text }}</el-checkbox>
        </template>

        <template v-if="item.type=='checkboxes'">
          <el-checkbox-group v-model="form[item.model]" :disabled="item.disabled">
            <el-checkbox
              v-for="(checkboxListItem,index) in item.checkboxList"
              :key="index"
              :label="checkboxListItem.label"
            />
          </el-checkbox-group>
        </template>
        <!-- 单选框  -->
        <template v-if="item.type=='radio'">
          <el-radio-group v-model="form[item.model]" :disabled="item.disabled">
            <el-radio
              v-for="radioListItem in item.radioList"
              :key="radioListItem.label"
              :label="radioListItem.value"
            >{{ radioListItem.label }}</el-radio>
          </el-radio-group>
        </template>
        <!-- 文本区域  -->
        <template v-if="item.type=='textarea'">
          <el-input
            v-model="form[item.model]"
            type="textarea"
            :resize="item.disabled?'none':'auto'"
            :placeholder="'请输入'+item.label"
            :rows="5"
            :disabled="item.disabled"
            :maxlength="item.maxlength"
            :show-word-limit="item.maxlength?true:false"
          />
        </template>
        <!-- 时间输入带下拉  -->
        <template v-if="item.type=='durationtime'">
          <el-input-number
            v-if="item.isNum"
            v-model="form[item.model1]"
            class="durationtime left"
            :placeholder="'请输入'+item.label"
            :precision="item.precision?item.precision:0"
            :controls="false"
            :disabled="item.disabled"
          />
          <el-input
            v-else
            v-model="form[item.model1]"
            class="durationtime"
            :placeholder="'请输入'+item.label"
            :disabled="item.disabled"
          />

          <el-select v-model="form[item.model2]" class="unit" placeholder="请选择" :disabled="item.disabled">
            <el-option
              v-for="(unitListItem,index) in item.unitList"
              :key="index"
              :label="unitListItem.label"
              :value="unitListItem.value"
            />
          </el-select>
        </template>
        <!-- 上传图片  -->
        <template v-if="item.type=='img'">
          <el-upload
            accept="image/*"
            :before-upload="beforeImgUpload"
            :disabled="item.disabled"
            :action="action"
            list-type="picture-card"
            :limit="imgLimit"
            :file-list="imgList"
            :on-exceed="handleExceedimg"
            :on-preview="handlePictureCardPreview"
            :on-success="upimgsuccess"
            :on-error="upLoadError"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
          <div v-show="uploadImgError" class="errormsg">{{ uploadImgError }}</div>
        </template>
        <!-- 上传文件  -->
        <template v-if="item.type=='file'">
          <el-upload
            class="upload-demo"
            accept="image/jpeg,image/png,application/pdf,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/x-rar-compressed"
            :on-success="upfilesuccess"
            :on-error="upLoadError"
            :before-upload="beforeFileUpload"
            :disabled="item.disabled"
            :action="action"
            :limit="fileLimit"
            :on-exceed="handleExceedfile"
            :on-change="handleChange"
            :file-list="fileList"
          >
            <el-button plain :disabled="item.disabled">上传附件</el-button>
            <div slot="tip" class="el-upload__tip">附件支持类型：JPG/PNG/PDF/DOC/XLSX/RAR，最大不能超过15M</div>
          </el-upload>
          <div v-show="uploadFileError" class="errormsg">{{ uploadFileError }}</div>
        </template>
        <!-- 模具绑定 -->
        <template v-if="item.type=='mjbd'">
          <el-checkbox v-model="showmjbdTable">开启</el-checkbox>
          <p class="tip" :style="{display:'block',marginLeft:0}">勾选后，设备可绑定模具</p>

          <el-table
            v-show="showmjbdTable"
            size="mini"
            :data="mujuTableData"
            header-row-class-name="yztHeader"
            style="width: 500px;border:1px solid rgba(242, 242, 242, 1);border-bottom:none; border-box;"
          >
            <el-table-column label="" align="center" width="60">
              <template slot-scope="scope">
                <span
                  class="el-icon-close"
                  style="color: red;cursor: pointer;font-weight:800;"
                  @click="delmuju(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column label="读数名称/单位" width="320">
              <template slot-scope="scope">
                <el-select v-model="scope.row.select" placeholder="请选择">
                  <el-option
                    v-for="(selectlistItem,index) in scope.row.selectlist"
                    :key="index"
                    :label="selectlistItem.label"
                    :value="selectlistItem.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="default" align="center" label="初始值" />
          </el-table>
          <div v-if="!readonly" v-show="showmjbdTable" class="equipmentReading"><span @click="addmuju">+添加一行</span></div>
        </template>
        <!-- 设备读数  -->
        <template v-if="item.type=='equipmentReading'">
          <el-table
            size="mini"
            :data="equipmentReadingTableData"
            header-row-class-name="yztHeader"
            style="width: 500px;border:1px solid rgba(242, 242, 242, 1);border-bottom:none; border-box;"
          >
            <el-table-column label="" align="center" width="60">
              <template slot-scope="scope">
                <span
                  class="el-icon-close"
                  style="color: red;cursor: pointer;font-weight:800;"
                  @click="delEquipmentReading(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column label="读数名称/单位" width="320">
              <template slot-scope="scope">
                <el-select v-model="scope.row.select" placeholder="请选择">
                  <el-option
                    v-for="(selectlistItem,index) in scope.row.selectlist"
                    :key="index"
                    :label="selectlistItem.label"
                    :value="selectlistItem.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="default" align="center" label="初始值" />
          </el-table>
          <div v-if="!readonly" class="equipmentReading"><span @click="addEquipmentReading">+添加一行</span></div>
        </template>
        <!-- 次品项列表  -->
        <template v-if="item.type=='addKind'">
          <el-table
            size="mini"
            :data="kindTableData"
            header-row-class-name="yztHeader"
            style="width: 500px;border:1px solid rgba(242, 242, 242, 1);border-bottom:none; border-box;"
          >
            <el-table-column v-if="!readonly" label="" align="center" width="60">
              <template slot-scope="scope">
                <span
                  class="el-icon-close"
                  style="color: red;cursor: pointer;font-weight:800;"
                  @click="delKind(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column label="次品分类" width="auto" align="center">
              <template slot-scope="scope">
                <el-select v-if="!readonly" v-model="scope.row.select1" class="addkind" placeholder="请选择">
                  <el-option
                    v-for="(selectlistItem,index) in scope.row.selectlist1"
                    :key="index"
                    :label="selectlistItem.label"
                    :value="selectlistItem.value"
                  />
                </el-select>
                <template v-else>
                  {{ scope.row.select1||'-' }}
                </template>
              </template>
            </el-table-column>
            <el-table-column label="次品项名称" width="auto" align="center">
              <template slot-scope="scope">
                <el-select v-if="!readonly" v-model="scope.row.select2" class="addkind" placeholder="请选择">
                  <el-option
                    v-for="(selectlistItem,index) in scope.row.selectlist2"
                    :key="index"
                    :label="selectlistItem.label"
                    :value="selectlistItem.value"
                  />
                </el-select>
                <template v-else>
                  {{ scope.row.select2||'-' }}
                </template>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="!readonly" class="equipmentReading"><span @click="addKind">+添加一行</span></div>
        </template>
        <!-- 物料列表  -->
        <template v-if="item.type=='addMaterial'">
          <el-table
            size="mini"
            :data="materialTableData"
            header-row-class-name="yztHeader"
            style="width: 900px;border:1px solid rgba(242, 242, 242, 1);border-bottom:none; border-box;"
          >
            <el-table-column v-if="!readonly" label="" align="center" width="60">
              <template slot-scope="scope">
                <span
                  class="el-icon-close"
                  style="color: red;cursor: pointer;font-weight:800;"
                  @click="delMaterial(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column type="index" label="行号" align="center" width="60" />
            <el-table-column label="物料编号/名称" width="auto">
              <template slot-scope="scope">
                <el-select v-if="!readonly" v-model="scope.row.select1" placeholder="请选择">
                  <el-option
                    v-for="(selectlistItem,index) in scope.row.selectlist1"
                    :key="index"
                    :label="selectlistItem.label"
                    :value="selectlistItem.value"
                  />
                </el-select>
                <template v-else>
                  {{ scope.row.select1||'-' }}
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="desc" align="center" width="200" label="规格描述" />
            <el-table-column label="嵌套数" align="center" width="120">
              <template slot-scope="scope">
                <el-input v-if="!readonly" v-model="scope.row.num" class="addMaterial" />
                <template v-else>
                  {{ scope.row.num||'-' }}
                </template>
              </template>
            </el-table-column>
            <el-table-column label="单位" align="center" width="120">
              <template slot-scope="scope">
                <el-select v-if="!readonly" v-model="scope.row.select2" class="addMaterial" placeholder="请选择">
                  <el-option
                    v-for="(selectlistItem,index) in scope.row.selectlist2"
                    :key="index"
                    :label="selectlistItem.label"
                    :value="selectlistItem.value"
                  />
                </el-select>
                <template v-else>
                  {{ scope.row.select2||'-' }}
                </template>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="!readonly" style="width:900px;" class="equipmentReading"><span @click="addMaterial">+添加一行</span></div>
        </template>
        <!-- 标签模板  -->
        <template v-if="item.type=='addTemplate'">
          <span v-if="readonly" class="readonlyspan">{{ templateTableData[0]&&templateTableData[0].select||'-' }}</span>
          <el-table
            v-if="!readonly"
            size="mini"
            :data="templateTableData"
            header-row-class-name="yztHeader"
            style="width: 600px;border:1px solid rgba(242, 242, 242, 1);border-bottom:none; border-box;"
          >
            <el-table-column v-if="!readonly" label="" align="center" width="60">
              <template slot-scope="scope">
                <span
                  class="el-icon-close"
                  style="color: red;cursor: pointer;font-weight:800;"
                  @click="delTemplate(scope.row)"
                />
              </template>
            </el-table-column>
            <el-table-column type="index" label="行号" align="center" width="60" />
            <el-table-column label="标签模板" width="320">
              <template slot-scope="scope">
                <el-select v-model="scope.row.select" placeholder="请选择">
                  <el-option
                    v-for="(selectlistItem,index) in scope.row.selectlist"
                    :key="index"
                    :label="selectlistItem.label"
                    :value="selectlistItem.value"
                  />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column label="是否默认" align="center" width="auto">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.iSdefault" />
              </template>
            </el-table-column>
          </el-table>
          <div v-if="!readonly" style="width:600px;" class="equipmentReading"><span @click="addTemplate">+添加一行</span></div>
        </template>
        <!-- 自定义字段  -->
        <template v-if="item.type=='customField'">
          <el-table
            size="mini"
            :data="customFieldTableData"
            header-row-class-name="yztHeader"
            style="width: 500px;border:1px solid rgba(242, 242, 242, 1);border-bottom:none; border-box;"
          >
            <el-table-column v-if="!readonly" label="" align="center" width="60">
              <template slot-scope="scope">
                <span
                  class="el-icon-close"
                  style="color: red;cursor: pointer;font-weight:800;"
                  @click="delCustomField(scope.row)"
                />
              </template>
            </el-table-column>
            <!-- <el-table-column
                    type="index"
                    label="行号"
                    align="center"
                    width="60">
                  </el-table-column> -->
            <el-table-column label=" 字段名称" width="auto" align="center">
              <template slot-scope="scope">
                <el-input v-if="!readonly" v-model="scope.row.filed" class="customField" />
                <template v-else>
                  {{ scope.row.filed||'-' }}
                </template>
              </template>
            </el-table-column>
            <el-table-column label=" 字段值" width="auto" align="center">
              <template slot-scope="scope">
                <el-input v-if="!readonly" v-model="scope.row.value" class="customField" />
                <template v-else>
                  {{ scope.row.value||'-' }}
                </template>
              </template>
            </el-table-column>
          </el-table>
          <div v-if="!readonly" class="equipmentReading"><span @click="addCustomField">+添加一行</span></div>
        </template>
        <!-- 维护策略  -->
        <template v-if="item.type=='strategy'">
          <StrategyTable :strategy-table-data="strategyTableData" @addstrategy="addstrategy" @delstrategy="delstrategy" />
        </template>
        <!-- 表单内插槽  -->
        <template v-if="item.type=='slot'">
          <slot :name="item.slotName" />
        </template>
        <!-- 表单内插槽含有作用域的测试阶段  -->
        <template v-if="item.type=='slot-scope'">
          <slot :name="item.slotName" :form="form" :item="item" />
        </template>
        <span v-if="item.after" class="afterInput">{{ item.after }}</span>
        <p v-if="item.tip" class="tip" :style="item.norules?'display:block;margin-left:0':''">{{ item.tip }}</p>

        <template v-if="item.type=='input_qr'&&form[item.model]||item.type=='readonlyInput_qr'&&form[item.model]">
          <br>
          <vue-qr class="input_qr" :logo-src="logo" :text="form[item.model]" :size="150" />
        </template>

      </el-form-item>
    </template>
    <slot />
    <el-form-item v-if="!readonly" :style="btnCenter?'text-align:center;margin-right:150px;':''">
      <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
      <el-button style="width:100px;" type="primary" @click="submitForm('form')">{{ btnText?btnText:'立即创建' }}</el-button>
      <el-button @click="cancel">取消</el-button>
      <el-checkbox v-if="checkedText" v-model="btnChecked" style="margin-left:28px;">{{ checkedText }}</el-checkbox>
    </el-form-item>
  </el-form>

</template>

<script>
// import { getList } from '@/api/table'//引入api接口
// import {
//   uuid
// } from 'vue-uuid'
import vueQr from 'vue-qr'
import StrategyTable from './StrategyTable'
export default {
  components: {
    StrategyTable,
    vueQr
  },
  // props: ['formdataCreator', 'imgList', 'fileList', 'btnText', 'readonly'],
  props: {
    formdataCreator: {
      type: Array,
      default() {
        return []
      }
    },
    mujuTableData: {
      type: Array,
      default() {
        return []
      }
    },
    equipmentReadingTableData: {
      type: Array,
      default() {
        return []
      }
    },
    kindTableData: {
      type: Array,
      default() {
        return []
      }
    },
    materialTableData: {
      type: Array,
      default() {
        return []
      }
    },
    templateTableData: {
      type: Array,
      default() {
        return []
      }
    },
    customFieldTableData: {
      type: Array,
      default() {
        return []
      }
    },
    strategyTableData: {
      type: Array,
      default() {
        return []
      }
    },
    imgList: {
      type: Array,
      default() {
        return []
      }
    },
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    readonly: {
      type: Boolean,
      default() {
        return false
      }
    },
    btnCenter: {
      type: Boolean,
      default() {
        return false
      }
    },
    btnText: {
      type: String,
      default() {
        return ''
      }
    },
    checkedText: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      labelWidth: '150px',
      btnChecked: false,
      showmjbdTable: false,
      logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjc5N0M1RUI2OUU3NTExRUI4QjY2OTA2MEQ3OUEyQTY3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjc5N0M1RUI3OUU3NTExRUI4QjY2OTA2MEQ3OUEyQTY3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Nzk3QzVFQjQ5RTc1MTFFQjhCNjY5MDYwRDc5QTJBNjciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Nzk3QzVFQjU5RTc1MTFFQjhCNjY5MDYwRDc5QTJBNjciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6vc2C/AAAGgElEQVR42sSZ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',
      form: {},
      action: process.env.VUE_APP_BASE_API + '/api/services/app/XXXXX_001TableName/UpFile?tenantId=' + window
        .localStorage.getItem('tenantId'),
      dialogImageUrl: '',
      dialogVisible: false,
      imgLimit: 5,
      fileLimit: 5,
      uploadImgError: '', // 上传图片出错时传入信息!!!
      uploadFileError: '', // 上传文件出错时传入信息!!!
      // rules: {
      //   name: [
      //     { required: true, message: '请输入活动名称', trigger: 'blur' },
      //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //   ],
      //   region: [
      //     { required: true, message: '请选择活动区域', trigger: 'change' }
      //   ],
      //   date1: [
      //     { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
      //   ],
      //   date2: [
      //     { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
      //   ],
      //   type: [
      //     { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
      //   ],
      //   resource: [
      //     { required: true, message: '请选择活动资源', trigger: 'change' }
      //   ],
      //   desc: [
      //     { required: true, message: '请填写活动形式', trigger: 'blur' }
      //   ],
      //   f_int2:[
      //     { required: true, message: '请输入爱好的id', trigger: 'blur' },
      //   ]
      // },
      // 改由props传入所以注释掉了
      // 设备读数tableData
      // equipmentReadingTableData: [],
      // 次品项列表tableData
      // kindTableData: [],
      // 物料列表tableData
      // materialTableData: [],
      // 标签模板tableData
      // templateTableData: [],
      // 自定义字段tableData
      // customFieldTableData: [],
      // 策略配置
      // strategyTableData: [],
      // 时间选择器用滴
      pickerOptions: {
        // 控制禁止选择的时间段
        // disabledDate(time) {
        //   return time.getTime() > Date.now()
        // },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  computed: {
    rules() {
      const rules = {}
      if (this.readonly) {
        return rules
      }
      this.formdataCreator.forEach((v) => {
        if (v.required) {
          if (v.type === 'input' || v.type === 'input_num' || v.type === 'input_qr' || v.type === 'textarea') {
            rules[v.model] = [{
              required: true,
              message: '请输入' + v.label,
              trigger: 'blur'
            }]
          } else {
            rules[v.model] = [{
              required: true,
              message: '请选择' + v.label,
              trigger: 'change'
            }]
          }
        }
      })
      // let rules2={
      //   durationtime: [
      //     { required: true, message: '请输入活动名称', trigger: 'blur' },
      //     { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
      //   ],
      //   unit: [
      //     { required: true, message: '请选择活动区域', trigger: 'change' }
      //   ],
      // }
      // Object.assign(rules,rules2)
      // console.log(rules)
      return rules
    }
  },
  created() {
    // this.$nextTick(()=>{

    this.formdataTransformation()
    // })
  },
  methods: {
    formdataTransformation() {
      // console.log('formdataTransformation', this.formdataCreator)
      this.formdataCreator.forEach((v, i) => {
        switch (v.type) {
          case 'title':
            break
          case 'img':
            break
          case 'file':
            break
          case 'equipmentReading':
            break
          case 'addKind':
            break
          case 'addMaterial':
            break
          case 'addTemplate':
            break
          case 'customField':
            break
          case 'mjbd':
            break
          case 'slot':
            // 测试表单label内slot的应用
            // this.$set(this.form, v.model, v.value)
            break
          case 'strategy':
            break
          case 'selectGroup': // 测试阶段将来可能去掉
            this.$set(this.form, v.model, v.value.length ? JSON.parse(v.value) : [])
            // this.$set( this.form, v.model, v.value)
            break
          case 'switch':// 数字转文字处理前期数字0的默认问题
            if (v.value == 0) {
              this.$set(this.form, v.model, v.f_label)
            } else {
              this.$set(this.form, v.model, v.value)
            }
            break
          case 'checkbox':// 数字转文字处理前期数字0的默认问题
            if (v.value == 0) {
              this.$set(this.form, v.model, '关闭')
            } else {
              this.$set(this.form, v.model, v.value)
            }
            break
          case 'checkboxes':
            this.$set(this.form, v.model, [])
            break
          case 'dates':
            this.$set(this.form, v.model, v.value)
            if (v.value[0]) {
              this.$set(this.form[v.model], [0], v.value[0])
              this.$set(this.form[v.model], [1], v.value[1])
            }
            //     console.log(v.model,v.value,)
            //     console.log('dates',this.form)
            //     console.log('dates',this.form[v.model])
            break
          case 'durationtime':
            this.$set(this.form, v.model1, v.value1)
            this.$set(this.form, v.model2, v.value2)
            break
            // case 'many':
            //     v.models.forEach((model,modelindex)=>{
            //       this.$set( this.form, v.model, v.values[modelindex] )
            //     })
            //     break;
          default:
            // console.log(v.model)
            this.$set(this.form, v.model, v.value)
        }
      })
      console.log(this.form)
    },
    submitForm(formName) {
      // console.log(this.$refs)
      // console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          // 表格项暂未提交将来考虑一起传递
          // this.$emit('submitForm',this.form,'新建')
          // console.log('submitForm', this.form,this.btnChecked)
          this.$emit('submitForm', this.form, this.btnChecked)
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // console.log(this.form)
    },
    cancel() {
      this.$emit('cancel')
    },
    readonlySwitchChange() {
      console.log(this.form)
      this.$emit('submitForm', this.form) // 向父组件提交更新
    },
    // 图片事件
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 检测数量
    handleExceedimg(files, fileList) {
      this.$message.warning(`限制上传图片数量为${this.imgLimit} 张，超过数量限制的图片将不被上传！！！`)
    },
    // 文件事件
    handleChange(file, fileList) {
      console.log(file, fileList)
      // this.fileList=fileList
      // console.log(this.fileList)
      // this.fileList = fileList.slice(-3);
    },
    handleExceedfile(files, fileList) {
      this.$message.warning(`限制上传文件数量为 ${this.fileLimit} 个，超过数量限制的文件将不被上传！！！`)
    },
    upimgsuccess(response, file, fileList) {
      this.form.imgList = fileList
      console.log(response, file, fileList) // 这是返回了一个id啊
    },
    upfilesuccess(response, file, fileList) {
      this.form.fileList = fileList
      console.log(response, file, fileList) // 这是返回了一个id啊
    },
    // 上传图片与文件之前的类型与大小验证
    beforeFileUpload(file) {
      console.log(file)
      const accept =
          'image/jpeg,image/png,application/pdf,application/msword,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/x-rar-compressed'
      const isAccept =
          accept.indexOf(file.type) !== -1
      const isLt = file.size / 1024 / 1024 / 15 <= 1
      if (!isAccept) {
        this.$message.error('上传文件只支持JPG/PNG/PDF/DOC/XLSX/RAR格式!')
      }
      if (!isLt) {
        this.$message.error('上传文件大小不能超过15M!')
      }
      return isLt && isAccept
    },
    beforeImgUpload(file) {
      console.log(file)
      const isIMG =
          file.type === 'image/jpg' ||
          file.type === 'image/jpeg' ||
          file.type === 'image/png'
      const isLt = file.size / 1024 / 1024 / 15 <= 1
      if (!isIMG) {
        this.$message.error('上传图片只支持jpg、jpeg、png格式!')
      }
      if (!isLt) {
        this.$message.error('上传图片大小不能超过15M!')
      }
      return isLt && isIMG
    },
    upLoadError(err, file, fileList) {
      console.log(err, file, fileList)
      this.$message.error('上传失败!')
    },

    // 设备读数
    delEquipmentReading(row) {
      this.$emit('delEquipmentReading', row)
      // console.log(row)
      // this.equipmentReadingTableData = this.equipmentReadingTableData.filter((v) => {
      //   return v.id !== row.id
      // })
    },
    addEquipmentReading() {
      this.$emit('addEquipmentReading')

      // const obj = {
      //   id: uuid.v1(),
      //   select: '',//下拉值
      //   selectlist: [{
      //     label: '产出数量/个',
      //     value: '产出数量/个'
      //   }, {
      //     label: '投料数量/个',
      //     value: '投料数量/个'
      //   }],
      //   default: '-'//默认值
      // }
      // this.equipmentReadingTableData.push(obj)
    },
    // 次品项列表
    delKind(row) {
      this.$emit('delKind', row)

      // console.log(row)
      // this.kindTableData = this.kindTableData.filter((v) => {
      //   return v.id !== row.id
      // })
    },
    addKind() {
      this.$emit('addKind')

      // const obj = {
      //   id: uuid.v1(),
      //   select1: '', // 次品分类
      //   select2: '', // 次品项名称
      //   selectlist1: [{
      //     label: '添加分类11',
      //     value: '添加分类11'
      //   }, {
      //     label: '添加分类12',
      //     value: '添加分类12'
      //   }],
      //   selectlist2: [{
      //     label: '添加分类21',
      //     value: '添加分类21'
      //   }, {
      //     label: '添加分类22',
      //     value: '添加分类22'
      //   }]
      // }
      // this.kindTableData.push(obj)
    },
    // 物料列表
    delMaterial(row) {
      this.$emit('delMaterial', row)

      // console.log(row)
      // this.materialTableData = this.materialTableData.filter((v) => {
      //   return v.id !== row.id
      // })
    },
    addMaterial() {
      this.$emit('addMaterial')

      // const obj = {
      //   id: uuid.v1(),
      //   select1: '', // 名称
      //   select2: '', // 单位
      //   desc: '', // 描述
      //   num: '', // 嵌套数
      //   selectlist1: [{
      //     label: '物料编号11',
      //     value: '物料编号11'
      //   }, {
      //     label: '物料编号12',
      //     value: '物料编号12'
      //   }],
      //   selectlist2: [{
      //     label: '个',
      //     value: '个'
      //   }, {
      //     label: '千克',
      //     value: '千克'
      //   }],
      //   default: ''
      // }
      // this.materialTableData.push(obj)
    },
    // 标签模板
    delTemplate(row) {
      this.$emit('delTemplate', row)

      // console.log(row)
      // this.templateTableData = this.templateTableData.filter((v) => {
      //   return v.id !== row.id
      // })
    },
    addTemplate() {
      this.$emit('addTemplate')

      // const obj = {
      //   id: uuid.v1(),
      //   select: '',
      //   selectlist: [{
      //     label: '标签模板aa',
      //     value: '标签模板aa'
      //   }, {
      //     label: '标签模板bb',
      //     value: '标签模板bb'
      //   }],
      //   iSdefault: false
      // }
      // this.templateTableData.push(obj)
    },
    // 自定义字段
    delCustomField(row) {
      this.$emit('delCustomField', row)

      // console.log(row)
      // this.customFieldTableData = this.customFieldTableData.filter((v) => {
      //   return v.id !== row.id
      // })
    },
    addCustomField() {
      this.$emit('addCustomField')

      // const obj = {
      //   id: uuid.v1(),
      //   filed: '测试自定义字段',
      //   value: '测试自定义字段值'
      // }
      // this.customFieldTableData.push(obj)
    },
    // 维护策略
    delstrategy(row) {
      this.$emit('delstrategy', row)
      // this.strategyTableData = this.strategyTableData.filter((v) => {
      //   return v.id !== row.id
      // })
    },
    addstrategy() {
      this.$emit('addstrategy')
      // const obj = {
      //   id: uuid.v1(),
      //   name: '',
      //   namelist: [{
      //     label: '策略名aa',
      //     value: '策略名aa'
      //   }, {
      //     label: '策略名bb',
      //     value: '策略名bb'
      //   }],
      //   desc: '',
      //   desclist: [{
      //     label: '策略描述aa',
      //     value: '策略描述aa'
      //   }, {
      //     label: '策略描述bb',
      //     value: '策略描述bb'
      //   }],
      //   starttime: '',
      //   endtime: '',
      //   sczy: '生产占用',
      //   cllx: '策略类型',
      //   clfx: '策略方向',
      //   edit: true
      // }
      // this.strategyTableData.push(obj)
    },
    // 模具绑定
    delmuju(row) {
      this.$emit('delmuju', row)
    },
    addmuju() {
      this.$emit('addmuju')
    },
    dateFormat(date) {
      if (!date) {
        return ''
      }
      // date.toLocaleDateString()
      const datearr = date.split('/')
      return datearr[2] + '年' + datearr[0] + '月' + datearr[1] + '日'
    },
    datesFormat(d) {
      // if(d){
      if (!d) {
        return ''
      }
      const date = d.toLocaleDateString()
      const datearr = date.split('/')
      return datearr[0] + '年' + datearr[1] + '月' + datearr[2] + '日'
      // }else{
      //   return ''
      // }
    },
    computedReadonlyRadio(value, list) {
      var res = ''
      if (list.length) {
        list.forEach((v) => {
          if (v.value == value) {
            res = v.label
          }
        })
      }
      return res
    }
  }
}
</script>

<style scoped="scoped">
  .GeneralForm>>>label {
    font-weight: 400;
    padding-right: 22px;
  }

  .GeneralForm>>>.el-upload-list--picture-card .el-upload-list__item-status-label {
    padding: 0;
  }

  /* .el-form{
  max-width:900px;
} */
  .el-form-item {
    margin-bottom: 16px;
  }

  /* .GeneralForm>>>.el-form-item__label{
  line-height:38px;
} */
  .GeneralForm>>>.el-input {
    width: auto;
  }

  .GeneralForm>>>.el-input-number {
    width: 300px;
  }

  .GeneralForm>>>.el-input__inner {
    /* box-sizing: border-box;
  height:26px;
  line-height: 40px; */
    width: 300px;
    font-size: 12px;
  }

  /* .GeneralForm>>>.el-form-item__content{
  line-height: 40px;
} */
  .GeneralForm>>>.el-col-11 {
    width: auto;
  }

  .GeneralForm>>>.line {
    width: 14px;
    text-align: center;
  }

  .GeneralForm>>>.el-textarea {
    width: 614px;
  }

  .GeneralForm>>>.el-upload-list {
    width: 380px;
  }

  .GeneralForm>>>ul.is-disabled+.el-upload {
    cursor: not-allowed;
    display: none;
  }

  .errormsg {
    color: #F56C6C;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    position: absolute;
    top: 100%;
    left: 0;
  }

  .title {
    padding-left: 14px;
    line-height: 50px;
    font-size: 16px;
    color: #1f2f3d;
  }

  .tip {
    font-size: 10px;
    color: rgba(245, 154, 35, 0.8);
    margin: 0 0 0 15px;
    display: inline;
    /* line-height:30px; */
  }

  .durationtime {
    width: auto;
    margin-right: 12px;
  }

  .unit>>>input.el-input__inner {
    text-align: center;
    width: 84px;
  }

  /* 表格 */
  .GeneralForm>>>.el-table th {
    background: rgba(242, 242, 242, 1);
  }

  .equipmentReading {
    border: 1px solid rgba(242, 242, 242, 1);
    border-top: none;
    color: #8A898E;
    font-size: 12px;
    width: 500px;
    height: 28px;
    line-height: 28px;
    padding-left: 24px;
  }

  .equipmentReading span {
    cursor: pointer;
  }

  .equipmentReading span:hover {
    color: rgb(64, 158, 255);
  }

  .GeneralForm .addkind>>>.el-input__inner {
    width: 180px;
  }

  .GeneralForm .addMaterial>>>.el-input__inner {
    width: 90px;
  }

  .GeneralForm .customField>>>.el-input__inner {
    width: 190px;
  }

  .left>>>input {
    text-align: left;
  }

  /* readonly模式 */
  .GeneralForm>>>span.readonlyspan {
    color: rgb(51, 51, 51);
    font-size: 14px;
    max-width: 900px;
    display: inline-block;
  }

  .readonly>>>.el-range-editor.is-disabled {
    background-color: #fff;
    border-color: #fff;
    color: rgb(51, 51, 51);
    cursor: default;
  }

  .readonly>>>.el-checkbox__input.is-disabled .el-checkbox__inner {
    background-color: #fff;
    cursor: default;
  }

  /* .readonly>>>.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    border-color: #409EFF;
    background-color: #409EFF;
}
.readonly>>>.el-checkbox__input.is-disabled+span.el-checkbox__label {
    color: rgb(51,51,51);
    cursor: default;
}
.readonly>>>.el-checkbox__input.is-disabled .el-checkbox__inner::after {
    cursor: default;
    border-color: #fff;
}*/
  .readonly>>>.el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    border-color: #fff;
    color: rgb(51, 51, 51);
    cursor: default;
  }

  .readonly>>>.el-select .el-input.is-disabled .el-input__inner {
    cursor: default;
  }

  .readonly>>>.el-input.is-disabled .el-input__inner {
    background-color: #fff;
    border-color: #fff;
    color: rgb(51, 51, 51);
    cursor: default;
  }
  /* .readonly>>>.el-radio__input.is-disabled+span.el-radio__label{
    color: rgb(51, 51, 51);
  } */
  .readonly>>>.el-range-editor.is-disabled input {
    background-color: #fff;
    color: rgb(51, 51, 51);
    cursor: default;
  }

  .readonly>>>.el-range-editor.is-disabled .el-range-separator {
    color: rgb(51, 51, 51);
  }

  .readonly>>>.el-date-editor .el-range__icon {
    color: rgb(51, 51, 51);
  }

  .readonly>>>.el-tag.el-tag--info {
    background-color: #fff;
    border-color: #fff;
    color: rgb(51, 51, 51);
  }
  /* 上传文件 */
  .readonly>>>.el-input.is-disabled .el-input__icon {
    display: none;
  }
  .readonly>>>.el-upload,.readonly>>>.el-upload__tip{
    display: none;
  }
  .readonly>>>.el-upload-list__item:first-child{
    margin-top:2px;
  }
  /* 多行 */
  .inline {
    display: inline-block;
  }

  .inline>>>label {
    float: none;
    display: inline-block;
  }

  .inline>>>.el-form-item__content {
    margin-left: 0 !important;
    display: inline-block;
    /* vertical-align: bottom; */
    vertical-align: top;
  }

  .short>>>.el-input__inner,
  .short>>>.el-input-number {
    width: 90px;
  }
  .beforeunit>>>.el-input__inner,
  .beforeunit>>>.el-input-number{
    width:200px;
    margin-right:-12px;
  }
  .inline+.short>>>.el-form-item__label {
    width: auto !important;
    padding: 0 11px;
  }

  .nolable>>>.el-form-item__label,.inline+.nolable>>>.el-form-item__label {
    width: 0 !important;
    white-space: nowrap;
    overflow: hidden;
    opacity: 0;
  }

  .afterInput {
    font-size: 14px;
    color: #606266;
    line-height: 28px;
    padding: 0 11px;
  }

</style>
