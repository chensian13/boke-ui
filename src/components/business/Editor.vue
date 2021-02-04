<!--
  富文本编辑参考：https://www.cnblogs.com/wjlbk/p/12884661.html
-->
<template>
  <div>
    <quill-editor
      class="editor"
      ref="myTextEditor"
      :options="editorOption"
      v-model="info"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    />
    <el-dialog
      :visible.sync="visible"
      title="上传图片"
      width="360px"
      >
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: String,
        default: null
      },
      change: {
        type: Function,
        default: null
      }
    },
    components: {
    },
    data () {
      return {
        visible: false,
        editorOption: {
          modules: {
            toolbar: {
              container: [
                ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
                ["blockquote", "code-block"], // 引用  代码块
                // [{ header: 1 }, { header: 2 }], // 1、2 级标题
                // [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
                // [{ script: "sub" }, { script: "super" }], // 上标/下标
                [{ indent: "-1" }, { indent: "+1" }], // 缩进
                [{ size: ["small", false, "large", "huge"] }], // 字体大小
                [{ header: [1, 2, 3, 4, 5, 6] }], // 标题
                [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
                [{ font: ['serif', 'monospace'] }], // 字体种类
                // [{ align: [] }], // 对齐方式
                // ["clean"], // 清除文本格式
                ["link"] // 链接、图片、视频
              ], //工具菜单栏配置
              handlers: {
                // image: function(value) {
                //   that.visible = value
                //   if (value) {
                //     // 触发input框选择图片文件
                //   }
                // }
              }
            }
          },
          placeholder: '', //提示
          readyOnly: false, //是否只读
          theme: 'snow', //主题 snow/bubble
          syntax: true //语法检测
        }
      }
    },
    methods: {
      // 失去焦点
      onEditorBlur() {},
      // 获得焦点
      onEditorFocus() {},
      // 开始
      onEditorReady() {},
      // 值发生变化
      onEditorChange(editor) {
        if (this.change)
          this.change(editor.html)
        console.log(editor)
      }
    }
  }
</script>

<style>
  .editor {
    height: 540px;
    padding: 10px;
    margin-bottom: 100px;
  }
  .ql-snow .ql-tooltip[data-mode=link]::before {
    content: "请输入链接地址:";
  }
  .ql-snow .ql-tooltip.ql-editing a.ql-action::after {
      border-right: 0px;
      content: '保存';
      padding-right: 0px;
  }
 
  .ql-snow .ql-tooltip[data-mode=video]::before {
      content: "请输入视频地址:";
  }
 
  .ql-snow .ql-picker.ql-size .ql-picker-label::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item::before {
    content: '14px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
    content: '10px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
    content: '18px';
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
    content: '32px';
  }
 
  .ql-snow .ql-picker.ql-header .ql-picker-label::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item::before {
    content: '标题';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
    content: '标题1';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
    content: '标题2';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
    content: '标题3';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
    content: '标题4';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
    content: '标题5';
  }
  .ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
  .ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
    content: '标题6';
  }
 
  .ql-snow .ql-picker.ql-font .ql-picker-label::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item::before {
    content: '标准字体';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
    content: '衬线字体';
  }
  .ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
  .ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
    content: '等宽字体';
  }
</style>