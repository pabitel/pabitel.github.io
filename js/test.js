var data = results;
for (var i = 0; i < data.length; i++) {
  if (returnCitySN["cname"].indexOf(data[i].attributes.cityName) != -1
    ||  returnCitySN["cip"]==data[i].attributes.ip
  ) {
    layui.use('layer', function () {
      function yinyuan(msg) {
        msg = msg + '<br>请问姑娘芳名是？'
        layer.open({
          type: 0,
          title:'雪下的那么深，下的那么认真',
          content: `
            <p>${msg}</p>
            <input type="text" id="girlbeautyname"  placeholder="请输入芳名" autocomplete="off" class="layui-input">
          `,
          yes: function (index, layero) {
            var name = $('#girlbeautyname').val();
            var nameMsg;
            if (name == '' || name.indexOf("雪") == -1) {
              nameMsg = '四十五度角仰望天空：<br>你不说，我的心下了雪，<br>就叫你雪姑娘吧'
            } else {
              nameMsg = '原来是' + name + '姑娘,失敬失敬';
            }
            girlInfo.set('name', name);
              girlInfo.save().then(function (testObject) {
              });
            layer.open({
              title:'一定要认真选喔~',
              content: `
                  ${nameMsg}<br>
                  敢问姑娘对下面哪个姓有好感呢<br>
                  <div>
                    <label><input type="radio" name="sex" value="陈">陈</label>
                    <label><input type="radio" name="sex" value="陈">陈</label>
                    <label><input type="radio" name="sex" value="陈" checked>陈</label>
                    <label><input type="radio" name="sex" value="陈">陈</label>
                  </div>
                  `,
              yes: function (index, layero) {
                layer.open({
                  content: `真是没想到，竟然跟我陈瞎子一个姓哪，<br>
                        难道说？不可能，不可能，我们还是继续算吧！<br>
                        敢问姑娘喜欢哪一种天气呢？<br>
                      <div>
                        <label><input type="radio" name="sex" value="太阳">🌞</label>
                        <label><input type="radio" name="sex" value="太阳">🌞</label>
                        <label><input type="radio" name="sex" value="太阳" checked>🌞</label>
                        <label><input type="radio" name="sex" value="太阳">🌞</label>
                      </div>
                     `,
                  yes: function (index, layero) {
                    layer.open({
                      title:'happy',
                      content: `😂哈哈哈，我的小心脏扑通扑通跳，<br>姑娘的心思真的难猜啊，<br>
                      不过我陈瞎子岂非浪得虚名之辈，待我认真算她一算`,
                      btn: ['查看结果'],
                      yes: function (index, layero) {
                        layer.open({
                          content: `今夜月亮很美<br>
                          <input type="text" id="girlAnswer"  placeholder="请输入暗号"" autocomplete="off" class="layui-input">
                          `,
                          yes: function (index, layero) {
                            var answer = $('#girlAnswer').val();
                            if (answer.trim() != '风也温柔') {
                              alert('真是一个令人难过的答案，还有一次机会哦~')
                              return false;
                            } else {
                              girlInfo.set('answer', answer);
                              girlInfo.save().then(function (testObject) {
                              });
                              layer.open({
                                title:'哈哈哈',
                                content: `微信扫码查看<br>
                                  <img src="images/pabitel.png">
                                `
                              })
                            }
                          },
                          cancel: function () {
                            alert('别点啦，你好坏！');
                            return false;
                          }
                        })
                      }
                    })
                  },
                  cancel: function () {
                    alert('再点就要坏啦！');
                    return false;
                  }
                })
              },
              cancel: function () {
                alert('你个小可爱');
                return false;
              }
            })
          },
          cancel: function () {
            alert('你个小调皮');
            return false;
          }

        })
      }

      var layer = layui.layer;
      layer.open({
        title:'早哇！',
        content: '<img src="images/suan.png" width="200px" height="200px"/>',
        btn: ['算一卦', '不算'],
        yes: function (index, layero) {
          girlInfo.set('click', true);
          girlInfo.save();
          layer.open({
            content: '姑娘你好哇，请问算哪一个呢?',
            btn: ['算前程', '算姻缘'],
            yes: function (index, layero) {
              yinyuan('啊呀，不好意思 ！<br>这个功能不在服务区，<br>为您自动转接为姻缘');
            },
            btn2: function (index, layero) {
              yinyuan('姑娘，你好眼光，我可是天上的神算子下凡呢');
            },
            cancel: function () {
              alert('点我干啥，我可是还是黄花大闺女呢');
              return false;
            }
          })
        },
        btn2: function (index, layero) {
          girlInfo.set('click', true);
          girlInfo.save();
          layer.open({
            content: '恭喜获得免费算一卦，你真是太幸运了',
            btn: ['算前程', '算姻缘'],
            yes: function (index, layero) {
              yinyuan('啊呀，不好意思，这个功能不在服务区，为您自动转接为姻缘');
            },
            btn2: function (index, layero) {
              yinyuan('姑娘，你好眼光，我可是天上的神算子下凡呢');
            },
            cancel: function () {
              alert('点我干啥，我可是还是黄花大闺女呢');
              return false;
            }
          })
        },
        cancel: function () {
          girlInfo.set('click', true);
          girlInfo.save();
          alert('哎呀，人家很准的哦~')
          return false;
        }
      });
    });

  }
}