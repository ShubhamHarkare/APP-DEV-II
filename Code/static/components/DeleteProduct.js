import ManagerNavbar from './ManagerNavbar.js'
export default {
    template: `
    <div>
    <ManagerNavbar/>
    <form>
    <div class="manager-home">
        <div class="manager-form">
            <h1>Delete Product</h1>
            <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label"><strong>Select Section</strong></label>
  <select v-model="selected_product">
  <option v-for="(name,id) in all_products">{{ name.name }}</option>
    </select>
</div>

    <button type="submit" @click.prevent="handelSubmit" class="btn btn-lg btn-primary">Delete Product</button>
        </div>
    </div>
</form>

    </div>
    `,
    data() {
        return {
            all_products: null,
            selected_product: null
        }
    },
    mounted: async function(){
        const res = await fetch('/product',{
            headers: {
                'Authentication-Token':localStorage.getItem('auth-token')
            }
        })
        const data = await res.json()
        if(res.ok){
            this.all_products = data
        }
    },
    methods: {
        handelSubmit: async function () {
            const res = await fetch('/delete-product',{
                method:'DELETE',
                headers: {
                    'Authentication-Token':localStorage.getItem('auth-token'),
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    'name': this.selected_product
                })
            })
            const data = await res.json()
            if (res.ok) {
                alert(data.message)
            }else{
                alert(data.message)
            }
        }
        
    },
    components: {ManagerNavbar}
}