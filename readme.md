


 user={
      username: String,
      password: String,
      email: String,
      events: [
           Title: String,
           Date: String,
           Location: String,
           maxGuests: Number,
           HostName: String,
           tables: [ 
                title: String,
                maxGuests: Number,
                categories: [{type: Schema.Types.ObjectId, ref: 'category'}],  *not exist* 
                guests: [ 
                      globalGuest_id: { type: Schema.Types.ObjectId, ref: 'globalGuest' },
                       comment: String, 
                       numConfirmed: Number, 
                       numUndecided: Number,
                       numNotComing: Number
                       invitations: [   
                              invitationName: String,
                              titleInput: String,
                              textInput: String,
                              background: String,
                              titleColor: String,
                              bodyText: String],
                     categories: [{ type: Schema.Types.ObjectId, ref: 'category' }], *not exist*
                 ]
           ],
           invitations: [  
                  invitationName: String,
                  titleInput: String,
                  textInput: String,
                  background: String,
                  titleColor: String,
                  bodyText: String
                ],
           guests: [
                   globalGuest_id: { type: Schema.Types.ObjectId, ref: 'globalGuest' },
                   invitations: [
                            invitationName: String,
                            titleInput: String,
                            textInput: String,
                            background: String,
                            titleColor: String,
                            bodyText: String
                   ],
                   categories: [{ type: Schema.Types.ObjectId, ref: 'category' }],*not exist*
                   comment: String,
                   numConfirmed: Number,
                   numUndecided: Number,
                   numNotComing: Number
           ],
      ], 
        guests: [
            name: String,
            email: String,
            phone: String,
        ], 
        categories: []   
      
 }
