'use strict';

const testData = JSON.stringify(
  {
    "name": "JavaScript",
    "description": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad autem, beatae dignissimos ducimus fugit nemo nihil\n" +
      "        quis similique vero voluptatibus? A beatae dicta, eum ex incidunt iusto quaerat saepe ullam.",
    "questions": [
      {
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate eveniet facilis impedit iure laudantium\n" +
          "    maxime nisi, quam repellat temporibus. Animi aut distinctio dolor earum, enim facilis ipsa ratione tempora?",
        "imageSrc": "images/img1.png",
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
        "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab cupiditate eveniet facilis impedit iure laudantium\n" +
          "    maxime nisi, quam repellat temporibus. Animi aut distinctio dolor earum, enim facilis ipsa ratione tempora?",
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

  enableLinksListener() {
    this.$window.on('click', e => {
      const $btn = $(e.target).closest('.btn');
      if (!$btn.length) return;

      const link = $btn.attr('data-link');
      if (!link) return;

      const $from = $btn.closest('.page');
      const $to = $('.' + link);
      this.move($from, $to);
    });
  },

  move($from, $to) {
    $from.css('left', '-100%');
    if ($from.hasClass('page--move-right')) $from.css('left', '100%');

    $to.css({
      'left': '0',
    });
  }
};

class Test {
  #answered = [];
  #correctAnswers = [];

  constructor() {
    if (Test.instance) return Test.instance;
    Test.instance = this;

    this
      .extractData()
      .build()
      .enableAnswerListener();
  }

  extractData() {
    const data = this.data = JSON.parse(testData);
    this.questionsAmout = data.questions.length;
    console.dir(this.data);

    return this;
  }

  enableAnswerListener() {
    $('.page-qn').on('click', e => {
      const $btn = $(e.target).closest('.page-qn_answer');
      if (!$btn.length || $btn.prop('disabled')) return;

      const answeredQuestion = $(e.currentTarget).data('qnNum');
      this.#answered.push(answeredQuestion);
      if ($btn.data('isCorrect')) this.#correctAnswers.push(answeredQuestion);


      $btn.addClass('btn--colored')
        .prop('disabled', true);

      $btn.siblings('.page-qn_answer')
        .prop('disabled', true);

      $(e.currentTarget).find('.page-qn_btn-next')
        .addClass('btn--colored')
        .text('Следующий вопрос');
    });

    return this;
  }

  build() {
    return this
      .buildStart()
      .buildQnsNav()
      .buildQns();
  }

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
  }

  buildQnsNav() {
    const $pageQnsNavContent = $('.page-qns-nav_content');

    for (let i = 0; i < this.questionsAmout; i++) {
      $(document.createElement('button'))
        .addClass('btn')
        .addClass('btn--colored')
        .addClass('page-qns-nav_qn-link')
        .attr('data-link', `page-qn-${i + 1}`)
        .text(`Вопрос ${i + 1}`)
        .appendTo($pageQnsNavContent);
    }

    return this;
  }

  buildQns() {
    const questions = this.data.questions;
    const elementsArray = this.qnsElements = [];

    for (let i = 0; i < this.questionsAmout; i++) {
      const {text, answers, imageSrc} = questions[i];

      elementsArray.push(
        $(document.createElement('section'))
          .data('qnNum', i)
          .addClass('page-qn')
          .addClass(`page-qn-${i + 1}`)
          .addClass('page')
          .addClass('page--move-right')
          .append(this.getHeader(i))
          .append(
            this.getContent()
              .append(this.getQuestion(text, imageSrc))
              .append(this.getAnswers(answers))
              .append(this.getButtons(i))
          ).appendTo('.window')
      );
    }

    return this;
  }

  getHeader(index) {
    return $(document.createElement('header'))
      .addClass('page_header')
      .text(`Вопрос ${index + 1}`);
  }

  getContent() {
    return $(document.createElement('div'))
      .addClass('page-qn_content')
      .addClass('page_content');
  }

  getQuestion(text, imageSrc) {
    const $question = $(document.createElement('div'))
      .addClass('page-qn_question');
    if (imageSrc) $question.append(this.getImage(imageSrc));
    $question.append(this.getText(text));

    return $question;
  }

  getImage(src) {
    return $(document.createElement('img'))
      .addClass('page-qn_question-img')
      .attr('src', src);
  }

  getText(text) {
    return $(document.createElement('div'))
      .addClass('page-qn_question-text')
      .append(
        $(document.createElement('p')).text(text)
      );
  }

  getAnswers(answers) {
    return $(document.createElement('ul'))
      .addClass('page-qn_answers-list')
      .append(
        ...answers.map(answer => {
          return $(document.createElement('li'))
            .data('isCorrect', answer.isCorrect)
            .addClass('page-qn_answer')
            .addClass('btn')
            .text(answer.text);
        })
      );
  }

  getButtons(index) {
     const $container = $(document.createElement('div'))
      .addClass('page-qn_btns-container')
      .append(
        $(document.createElement('button'))
          .addClass('page-qn_btn')
          .addClass('btn')
          .attr('data-link', 'page-qns-nav')
          .text('Вернуться')
      );

     if (index + 1 < this.questionsAmout) {
       $container.append(
         $(document.createElement('button'))
           .addClass('page-qn_btn')
           .addClass('page-qn_btn-next')
           .addClass('btn')
           .attr('data-link', `page-qn-${index + 2}`)
           .text('Пропустить')
       );
     }

     return $container;
  }
};

$(() => {
  navigation.enableLinksListener();
  new Test();
});