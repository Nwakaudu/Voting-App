'use strict'
$(document).ready(() => {
    let req = false, courses = [], year = [], partylist = []
    //set timeout for all ajax requests 
    $.ajaxSetup({
        timeout: 30000,
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }   
    })
    $(".open_settings").click(() => {
        const settings_parent = $(".settings")
        const settings_main = $(".settings_main")
        settings_parent.addClass("flex")
        settings_main.addClass(settings_main.attr("animate-in"))
        settings_parent.removeClass("hidden")
        setTimeout(() => {
            settings_main.removeClass(settings_main.attr("animate-in"))
        }, 500)
    })
    $(".settings").click(function (e) {
        const settings_parent = $(".settings")
        const settings_main = $(".settings_main")
        if ($(e.target).hasClass("settings")) {
            settings_main.addClass(settings_main.attr("animate-out"))
            setTimeout(() => {
                settings_parent.addClass("hidden")
                settings_parent.removeClass("flex")
                settings_main.removeClass(settings_main.attr("animate-out"))
            }, 500)
        }
    })
    $(".close_settings").click(() => {
        const settings_parent = $(".settings")
        const settings_main = $(".settings_main")
        settings_main.addClass(settings_main.attr("animate-out"))
        setTimeout(() => {
            settings_parent.addClass("hidden")
            settings_parent.removeClass("flex")
            settings_main.removeClass(settings_main.attr("animate-out"))
        }, 500)
    })
    //create election
    $(".create_election_btn").click( function(e) {
        e.preventDefault()
        const parent = $(".create_election")
        const main = $(".create_election_main")
        parent.addClass("flex") 
        main.addClass(main.attr("animate-in"))
        parent.removeClass("hidden")
        setTimeout( () => {
            main.removeClass(main.attr("animate-in"))
        }, 500)
    })
    $(".close_e_create").click( function(e) {
        e.preventDefault() 
        const parent = $(".create_election")
        const main = $(".create_election_main") 
        main.addClass(main.attr("animate-out")) 
        setTimeout( () => {
            parent.addClass("hidden")
            parent.removeClass("flex")
            main.removeClass(main.attr("animate-out")) 
        }, 501)
    })
    $(".c_list_e").click( () => {
        const courses = $(".courses")
        const year = $(".year")
        if(courses.hasClass("md:hidden")){
            courses.removeClass("md:hidden")
            year.addClass("md:hidden")
        }
    })
    $(".y_list_e").click( () => {
        const courses = $(".courses")
        const year = $(".year")
        if(year.hasClass("md:hidden")){
            year.removeClass("md:hidden")
            courses.addClass("md:hidden")
        }
    })
    $(".create_e_btn").click( function(e){
        e.preventDefault() 
        const x = $(this)
        const data = $(this).attr("data")
        if($(this).attr("data") === ".e_submit"){
            $(".create_election_form").find("input[name], select[name], textarea[name]").each(function(){
                if($(this).val() != ""){
                    if($($(this)).attr("name") === "e_title"){
                        $(data).find(`${data}_title`).text($(this).val())
                    } 
                    if($($(this)).attr("name") === "e_description"){
                        $(data).find(`${data}_description`).text($(this).val())
                    } 
                    if($($(this)).attr("name") === "courses"){
                        const selected_crs = $(this).val().split(",")
                        $(data).find(`${data}_crs`).html('')
                        for(let i = 0; i < selected_crs.length; i++){
                            $(data).find(`${data}_crs`).append(`
                                <div style="border-color: ${dark()}" class="border rpl p-1 px-3 rounded-full cursor-pointer">
                                    <span class="text-gray-900 dark:text-gray-300/80 font-medium">
                                        ${defaults(JSON.parse($(".create_election").find("input[name='default-course']").val()), selected_crs[i])}
                                    </span>
                                </div>
                            `)
                        }
                    }   
                    if($($(this)).attr("name") === "year"){
                        const selected_yr = $(this).val().split(",")
                        $(data).find(`${data}_yr`).html('')
                        for(let i = 0; i < selected_yr.length; i++){
                            $(data).find(`${data}_yr`).append(`
                                <div style="border-color: ${dark()}" class="border rpl p-1 px-3 rounded-full cursor-pointer">
                                    <span class="text-gray-900 dark:text-gray-300/80 font-medium">
                                        ${defaults(JSON.parse($(".create_election").find("input[name='default-year']").val()), selected_yr[i])}
                                    </span>
                                </div>
                            `)
                        }
                    } 
                    if($($(this)).attr("name") === "positions"){
                        const selected_pos = JSON.parse($(this).val())
                        $(data).find(`${data}_pos`).html('')
                        for(let i = 0; i < selected_pos.length; i++){
                            $(data).find(`${data}_pos`).append(`
                                <div style="border-color: ${dark()}" class="border rpl p-1 px-3 rounded-full cursor-pointer">
                                    <span class="text-gray-900 dark:text-gray-300/80 font-medium">
                                        ${defaults(JSON.parse($(".create_election").find("input[name='default-pos']").val()), selected_pos[i].id)}
                                    </span>
                                </div>
                            `)
                        }
                    } 
                    if($($(this)).attr("name") === "partylists"){
                        const selected_pty = $(this).val().split(",")
                        $(data).find(`${data}_pty`).html('')
                        for(let i = 0; i < selected_pty.length; i++){
                            $(data).find(`${data}_pty`).append(`
                                <div style="border-color: ${dark()}" class="border rpl p-1 px-3 rounded-full cursor-pointer">
                                    <span class="text-gray-900 dark:text-gray-300/80 font-medium">
                                        ${defaults(JSON.parse($(".create_election").find("input[name='default-pty']").val()), selected_pty[i])}
                                    </span>
                                </div>
                            `)
                        }
                    } 
                    $(".create_e_btn").removeClass("active-e-btn")
                    x.addClass("active-e-btn")
                    $(".e_info, .e_courses, .e_positions, .e_partylist, .e_submit").addClass("hidden")
                    $(data).removeClass("hidden") 
                } else {
                    Swal.fire({
                        title: "Please fill up all feilds",
                        icon: 'info', 
                        backdrop: true, 
                        allowOutsideClick: false
                    }) 
                    return false
                }
            })
        } else {
            $(".create_e_btn").removeClass("active-e-btn")
            $(this).addClass("active-e-btn")
            $(".e_info, .e_courses, .e_positions, .e_partylist, .e_submit").addClass("hidden")
            $($(this).attr("data")).removeClass("hidden")
        }
        
    })
    //when course list is clicked 
    $(".course_select").click(function() {
        const icon = `<i class="fad fa-check-circle"></i>`
        if(!$(this).hasClass("active-b-green")){
            //check if courses array is  empty 
            if(courses.length === 0) {
                //if = to 0 push new item
                courses.push($(this).attr("data"))
                $(this).addClass("active-b-green")
                $(".courses").find("input[name='courses']").val(courses)
                $(this).find(".course_select_ic").html(icon)
            } else {
               //if the courses array is not equal to 0 
               //check if the selected item is not equal to the courses array 
               for(let i = 0; i < courses.length; i++){
                   //if not = push new item
                   if($(this).attr("data") != courses[i]){
                       courses.push($(this).attr("data"))
                       $(this).addClass("active-b-green")
                       $(".courses").find("input[name='courses']").val(courses)
                       $(this).find(".course_select_ic").html(icon)
                       break
                   } else {
                       courses.splice(i, 1)
                       $(this).removeClass("active-b-green")
                       $(".courses").find("input[name='courses']").val(courses)
                       $(this).find(".course_select_ic").html('')
                       break
                   }
               }
            }
        } else {
            //remove the item selected to courses array 
            for(let i = 0; i < courses.length; i++){
                if($(this).attr("data") == courses[i]){
                    courses.splice(i, 1)
                    $(this).removeClass("active-b-green")
                    $(".courses").find("input[name='courses']").val(courses)
                    $(this).find(".course_select_ic").html('')
                    break
                }
            }
        }
    })
    //when year list is clicked 
    $(".year_select").click(function() {
        const icon = `<i class="fad fa-check-circle"></i>`
        if(!$(this).hasClass("active-b-green")){
            //check if year array is  empty 
            if(year.length === 0) {
                //if = to 0 push new item
                year.push($(this).attr("data"))
                $(this).addClass("active-b-green")
                $(".year").find("input[name='year']").val(year)
                $(this).find(".year_select_ic").html(icon)
            } else {
               //if the year array is not equal to 0 
               //check if the selected item is not equal to the year array 
               for(let i = 0; i < year.length; i++){
                   //if not = push new item
                   if($(this).attr("data") != year[i]){
                       year.push($(this).attr("data"))
                       $(this).addClass("active-b-green")
                       $(".year").find("input[name='year']").val(year)
                       $(this).find(".year_select_ic").html(icon)
                       break
                   } else {
                       year.splice(i, 1)
                       $(this).removeClass("active-b-green")
                       $(".year").find("input[name='year']").val(year)
                       $(this).find(".year_select_ic").html('')
                       break
                   }
               }
            }
        } else {
            //remove the item selected to year array 
            for(let i = 0; i < year.length; i++){
                if($(this).attr("data") == year[i]){
                    year.splice(i, 1)
                    $(this).removeClass("active-b-green")
                    $(".year").find("input[name='year']").val(year)
                    $(this).find(".year_select_ic").html('')
                    break
                }
            }
        }
    })
    //when partylist is clicked
    $(".partylist_select").click(function(){
        const icon = `<i class="fad fa-check-circle"></i>`
        if(!$(this).hasClass("active-b-green")){
            //check if partylist array if = to 0 
            if(partylist.length === 0){
                partylist.push($(this).attr("data"))
                $(this).addClass("active-b-green")
                $(".partylists").find("input[name='partylists']").val(partylist)
                $(this).find(".partylist_select_ic").html(icon)
            } else {
                //if the partylist array is not equal to 0 
               //check if the selected item is not equal to the partylist array 
               for(let i = 0; i < partylist.length; i++){
                //if not = push new item
                if($(this).attr("data") != partylist[i]){
                    partylist.push($(this).attr("data"))
                    $(this).addClass("active-b-green")
                    $(".partylists").find("input[name='partylists']").val(partylist)
                    $(this).find(".partylist_select_ic").html(icon)
                    break
                } else {
                    partylist.splice(i, 1)
                    $(this).removeClass("active-b-green")
                    $(".partylists").find("input[name='partylists']").val(partylist)
                    $(this).find(".partylist_select_ic").html('')
                    break
                }
            }
            }
        } else {
            //remove the item selected to partylist array 
            for(let i = 0; i < partylist.length; i++){
                if($(this).attr("data") == partylist[i]){
                    partylist.splice(i, 1)
                    $(this).removeClass("active-b-green")
                    $(".partylists").find("input[name='partylists']").val(partylist)
                    $(this).find(".partylist_select_ic").html('')
                    break
                }
            }
        }
    })
    //when form is submitted 
    $(".create_election_form").submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: 'create-election/',
            method: 'POST',
            cache: false,
            processData: false,
            contentType: false,
            data: new FormData(this), 
            beforeSend: () => {
                $(".e_submit_summary").slideUp(500)
                $(".e_submit_loading").removeClass("hidden") 
                $(".e_submit_loading").addClass("flex")
            },
            success: (res) => {
                if(res.created){
                    $(this).find("input[type='reset']").click()
                    setTimeout( () => {
                        $(".e_submit_loading_x").removeClass("flex") 
                        $(".e_submit_loading_x").addClass("hidden")
                        $(".e_submit_res").removeClass("hidden")
                        $(".e_submit_res").addClass("flex")
                        $(".e_submit_res").find(".e_submit_res_msg").text(res.msg)
                        $(".e_submit_res").find(".e_submit_res_start").text(res.data.e_start)
                        $(".e_submit_res").find(".e_submit_res_pass").text(res.data.passcode)  
                        $(".course_select, .year_select, .partylist_select").find(".course_select_ic, .year_select_ic, .partylist_select_ic").html('')
                        $(".course_select, .year_select, .partylist_select").removeClass("active-b-green")
                    }, 1500)
                } else {
                    Swal.fire({
                        title: res.msg,
                        html: res.txt,
                        icon: 'info', 
                        backdrop: true, 
                        allowOutsideClick: false
                    }).then( () => {
                        $(".e_submit_summary").slideDown(500)
                        $(".e_submit_loading").removeClass("flex") 
                        $(".e_submit_loading").addClass("hidden")
                    })
                }
            }, 
            error: (e) => {
                Swal.fire({
                    title: 'Connection error',
                    html: `${e.status} ${e.statusText}`,
                    icon: 'error', 
                    backdrop: true, 
                    allowOutsideClick: false
                }).then( () => {
                    $(".e_submit_summary").slideDown(500)
                    $(".e_submit_loading").removeClass("flex") 
                    $(".e_submit_loading").addClass("hidden")
                })
            }
        })
    })

    function defaults(arr, data){
        for(let i = 0; i < arr.length; i++){
            if(arr[i].id === data){
                return arr[i].type
            }
        }
    }
    $(".dt").flatpickr({
        disableMobile: "true", 
        minDate: "today",
        enableTime: true,
        dateFormat: 'Z'
    })
    elections()
    //get all elections 
    function elections() {
        Snackbar.show({ 
            text: `
                <div class="flex justify-center items-center gap-2"> 
                    <i style="font-size: 1.25rem;" class="fad animate-spin fa-spinner-third"></i>
                    <span>Fetching Elections</span>
                </div>
            `, 
            duration: false,
            showAction: false
        })
        setTimeout( async () => {
            try {
                const res = await fetchtimeout('election-list/', {
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    method: 'POST'
                })
                if(res.ok){
                    const data = await res.text()
                    $(".election_list").html(data)
                    setTimeout( () => {
                        $(".election_list").find(".icon_e_name").each( function() {
                            $(this).removeClass("skeleton-image")
                            $(this).attr("src", avatar($(this).attr("data"), "#fff", dark()) )
                        })
                    }, 1000)
                    Snackbar.show({ 
                        text: 'All Election Fetch',
                        duration: 3000, 
                        actionText: 'Okay'
                    })
                } else {
                    throw new Error(`${res.status} ${res.statusText}`)
                }
            } catch (e) {
                Snackbar.show({ 
                    text: 'Connection Error',
                    actionText: 'Retry',
                    duration: false, 
                    onActionClick: () => {
                        Snackbar.show({ 
                            text: `
                                <div class="flex justify-center items-center gap-2"> 
                                    <i style="font-size: 1.25rem;" class="fad animate-spin fa-spinner-third"></i>
                                    <span>Retrying...</span>
                                </div>
                            `, 
                            duration: false,
                            showAction: false
                        }) 
                        elections()
                    }
                })
            }
        }, 2000)
    }
    //get election every 10 seconds 
    setInterval( () => {
        if($("html[type='elections']").length !== 0){
            const e_count =  parseInt($("html[type='elections']").attr("total-election"))
            //get elections count
            socket.emit('elections', (res) => {
                if(e_count !== res.elections){
                    $("html[type='elections']").attr("total-election", res.elections)
                    elections()
                }
            })
        } else {
            clearInterval()
        }
    }, 5000) 
    //type writer effect
    var app = document.querySelector('#e_creating')
    var typewriter = new Typewriter(app, {
      loop: true,
      delay: 90,
    })
    typewriter
      .typeString('Creating Election...')
      .pauseFor(300)
      .deleteAll()
      .typeString('Please wait...')
      .pauseFor(1000)
      .start()
})
