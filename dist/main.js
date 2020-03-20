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
  $window: $('.window'),
  $pageStart: $('.page-start'),
  $pageQuestionsNav: $('.page-questions-nav'),

  $btnLinks: $('.btn[data-link]'),

  btnLinksListener() {
    this.$window.on('click', e => {
      const $btn = $(e.target).closest('.btn');
      if (!$btn) return;

      const link = $btn.attr('data-link');
      if (!link) return;

      const $from = $btn.closest('.page');
      const $to = $('.' + link);
      this.move($from, $to);
    });
  },

  move($from, $to) {
    $from.css('left', '-100%');
    $to.css('left', '0');
  }
};

const test = {
  extractData() {
    const data = this.data = JSON.parse(testData);
    this.questionsAmout = data.questions.length;
    console.dir(this.data);
  },

  build() {
    this
      .buildStart()
      .buildQnsNav();
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

  buildQnsNav() {
    const $pageQnsNavContent = $('.page-qns-nav_content');

    for (let i = 0; i < this.questionsAmout; i++) {
      $(document.createElement('button'))
        .addClass('btn')
        .addClass('btn--colored')
        .addClass('page-qns-nav_qn-link')
        .attr('data-link', `page-qn_${i + 1}`)
        .text(`Вопрос ${i + 1}`)
        .appendTo($pageQnsNavContent);
    }

    return this;
  }
};

test.extractData();

$(() => {
  navigation.btnLinksListener();
  test.build();
});