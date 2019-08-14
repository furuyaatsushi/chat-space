$(document).on('turbolinks:load', function(){
  function buildHTML(user){
    var html = `<div class="chat-group-users clearfix">
                  <p class="chat-group-users__name">
                    ${user.name}
                  </p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
                    追加
                  </div>
                </div>`
    return html;
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <div class="chat-group-user__name">
                    <p>
                      ${msg}
                    </p>
                  </div>`
    $('.chat-group-search-user').append(html);
  }

  $('#user-search-field').on('keyup', function(e){
    e.preventDefault();  
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users){
      $(".chat-group-search-user").empty();
      if (input.length == 0) {
        $('.chat-group-search-user').remove();
      }
      else{
        if (users.length !== 0) {
          users.forEach(function(user){
            var html = buildHTML(user);
            $('.chat-group-search-user').append(html);
          });
        }
        else { 
          appendErrMsgToHTML('一致するユーザーはいません');
        }
      }
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました')
    })
  });

  function appendAddUserToHTML(username) {
    var html = `<div class='chat-group-user clearfix js-chat-member'>
                  <p class="chat-group-users__name">
                    ${username}
                    </p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>
                    削除
                  </div>
                </div>`
    $('.js-add-user').append(html);
  }

  $(document).on("click", ".chat-group-user__btn--add", function(){
    $(this.parentNode).remove();
    var username = $(this).data('user-name')
    appendAddUserToHTML(username);
  })

  $(document).on("click", ".chat-group-user__btn--remove", function(){
    $(this.parentNode).remove();
  })
});