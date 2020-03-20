'use strict';

const testData = JSON.stringify(
  {
    "name": "JavaScript",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad autem, beatae dignissimos ducimus fugit nemo nihil\n" +
      "        quis similique vero voluptatibus? A beatae dicta, eum ex incidunt iusto quaerat saepe ullam.",
    "questions": [
      {
        "text": "Вопрос 1",
        "imageSrc": null,
        "answers":
          [
            {
              "text": "Ответ 1",
              "isCorrect": false
            }, {
            "text": "Ответ 2",
            "isCorrect": false
          }, {
            "text": "Ответ 3",
            "isCorrect": false
          }, {
            "text": "Ответ 4",
            "isCorrect": true
          }
          ]
      }, {
        "text": "Вопрос 2",
        "imageSrc": null,
        "answers": [
          {
            "text": "Ответ 1",
            "isCorrect": false
          }, {
            "text": "Ответ 2",
            "isCorrect": false
          }, {
            "text": "Ответ 3",
            "isCorrect": true
          }, {
            "text": "Ответ 4",
            "isCorrect": false
          }
        ]
      }
    ]
  }
);

const navigation = {
  $pageStart: $('.page-start'),
  $pageQuestionsNav: $('.page-questions-nav'),

  $btnLinks: $('.btn[data-link]'),

  btnLinksListeners() {
    this.$btnLinks.on('click', e => {
      const $btn = $(e.currentTarget);

      const $from = $btn.closest('.page');
      const $to = $('.' + $btn.attr('data-link'));
      this.move($from, $to);
    });
  },

  move($from, $to) {
    $from.css('left', '-100%');
    $to.css('left', '0');
  }
};

const test = {
  build() {
    const data = this.data = JSON.parse(testData);
    this.questionsAmout = data.questions.length;
    console.dir(this.data);

    this
      .buildStart()
      .buildQnNav();
  },

  buildStart() {
    const {name, description} = this.data;
    const $pageStart = $('.page-start');

    if (name) {
      $(document.createElement('span'))
        .addClass('page-start_title-sub')
        .text(name)
        .insertAfter($pageStart.find('.page_header'));
    }


    if (description) {
      $(document.createElement('p'))
        .text(description)
        .appendTo($pageStart.find('.page-start_des'));
    }

    return this;
  },

  buildQnNav() {
    const $pageQnNavContent = $('.page-qn-nav_content');

    for (let i = 0; i < 20; i++) {
      $(document.createElement('button'))
        .addClass('btn')
        .addClass('btn--colored')
        .addClass('page_qn-btn')
        .text(`Вопрос ${i + 1}`)
        .appendTo($pageQnNavContent);
    }

    return this;
  }
};

$(() => {
  navigation.btnLinksListeners();
  test.build();
});