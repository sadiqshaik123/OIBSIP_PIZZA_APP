import React from 'react'

export default function success({success}) {
    return (
        <div class="alert alert-success" role="alert">
            {success}
        </div>
    )
}
